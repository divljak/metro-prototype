#!/usr/bin/env node
// Scans approved prototypes for repeated JSX patterns and writes candidates
// to components/_lab/_candidates/. Run: npm run scan
//
// What it does:
//   1. Walks app/ recursively. Folders containing meta.ts with status:"approved"
//      are treated as approved prototypes.
//   2. For each approved prototype, parses all .tsx files and walks JSX trees.
//   3. For each non-trivial subtree (depth >= MIN_DEPTH, children >= MIN_CHILDREN),
//      computes a structural hash (tag names only, no text/expressions).
//   4. Groups occurrences. Hashes hitting MIN_OCCURRENCES are written as
//      candidates: {hash}.json in _candidates/.
//   5. Preserves the `dismissed` flag from any existing candidate file so
//      reviewer dismissals survive across scans.
//
// What it does NOT do:
//   - Does not extract or scaffold component files (Pass B).
//   - Does not infer prop types or names well — Bob owns naming and API design.
//   - Does not detect semantic similarity, only structural identity.

import { createRequire } from "node:module"
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  statSync,
  rmSync,
} from "node:fs"
import { createHash } from "node:crypto"
import { join, relative, sep } from "node:path"

const require = createRequire(import.meta.url)
const ts = require("typescript")

const ROOT = process.cwd()
const APP_DIR = join(ROOT, "app")
const CANDIDATES_DIR = join(ROOT, "components", "_lab", "_candidates")

const MIN_DEPTH = 2
const MIN_CHILDREN = 3
const MIN_OCCURRENCES_WITHIN_PROTOTYPE = 3
const MIN_OCCURRENCES_ACROSS_PROTOTYPES = 2
const MAX_SAMPLE_LENGTH = 800

function readMetaStatus(metaPath) {
  if (!existsSync(metaPath)) return null
  const src = readFileSync(metaPath, "utf8")
  const m = src.match(/status\s*:\s*["']([^"']+)["']/)
  return m ? m[1] : null
}

function findApprovedPrototypes() {
  const approved = []
  function walk(dir, parentApproved = null) {
    const metaPath = join(dir, "meta.ts")
    let scope = parentApproved
    if (existsSync(metaPath)) {
      const status = readMetaStatus(metaPath)
      if (status === "approved") {
        scope = { root: dir, name: relative(ROOT, dir) }
        approved.push(scope)
      } else if (status === "draft" || status === "archived") {
        scope = null
      }
    }
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      try {
        if (!statSync(full).isDirectory()) continue
      } catch {
        continue
      }
      if (entry.startsWith("_") || entry.startsWith(".")) continue
      walk(full, scope)
    }
  }
  walk(APP_DIR)
  return approved
}

function findTsxFiles(dir) {
  const out = []
  function walk(d) {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry)
      const st = statSync(full)
      if (st.isDirectory()) {
        if (entry === "node_modules" || entry.startsWith(".")) continue
        walk(full)
      } else if (entry.endsWith(".tsx")) {
        out.push(full)
      }
    }
  }
  walk(dir)
  return out
}

function getOpeningTagName(node) {
  if (ts.isJsxElement(node)) {
    return getNameFromTagName(node.openingElement.tagName)
  }
  if (ts.isJsxSelfClosingElement(node)) {
    return getNameFromTagName(node.tagName)
  }
  if (ts.isJsxFragment(node)) {
    return "Fragment"
  }
  return "?"
}

function getNameFromTagName(tagName) {
  if (ts.isIdentifier(tagName)) return tagName.text
  if (ts.isPropertyAccessExpression(tagName)) {
    return `${getNameFromTagName(tagName.expression)}.${tagName.name.text}`
  }
  return "?"
}

function jsxChildren(node) {
  if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
    return node.children.filter((c) => ts.isJsxElement(c) || ts.isJsxSelfClosingElement(c) || ts.isJsxFragment(c))
  }
  return []
}

function hashSubtree(node, depth = 0) {
  const tag = getOpeningTagName(node)
  const children = jsxChildren(node)
  if (children.length === 0) return tag
  const childSig = children.map((c) => hashSubtree(c, depth + 1)).join(",")
  return `${tag}(${childSig})`
}

function depthOf(node) {
  const children = jsxChildren(node)
  if (children.length === 0) return 1
  return 1 + Math.max(...children.map(depthOf))
}

function shortHash(s) {
  return createHash("sha1").update(s).digest("hex").slice(0, 8)
}

function suggestNameFromTag(tag) {
  const base = tag.replace(/\W/g, "")
  return `${base}Pattern`
}

function loadExistingCandidate(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"))
  } catch {
    return null
  }
}

function clearStaleCandidates(activeHashes) {
  if (!existsSync(CANDIDATES_DIR)) return
  for (const entry of readdirSync(CANDIDATES_DIR)) {
    if (!entry.endsWith(".json")) continue
    const hash = entry.replace(/\.json$/, "")
    if (!activeHashes.has(hash)) {
      const file = join(CANDIDATES_DIR, entry)
      const existing = loadExistingCandidate(file)
      if (existing && existing.dismissed) continue
      rmSync(file)
    }
  }
}

function main() {
  const approved = findApprovedPrototypes()
  if (approved.length === 0) {
    console.log("scan-prototypes: no approved prototypes found (set status:\"approved\" in a prototype meta.ts).")
    if (!existsSync(CANDIDATES_DIR)) mkdirSync(CANDIDATES_DIR, { recursive: true })
    return
  }

  console.log(`scan-prototypes: scanning ${approved.length} approved prototype(s):`)
  for (const p of approved) console.log(`  - ${p.name}`)

  const occurrencesByHash = new Map()

  for (const proto of approved) {
    const files = findTsxFiles(proto.root)
    for (const file of files) {
      const src = readFileSync(file, "utf8")
      const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

      function visit(node) {
        if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
          const children = jsxChildren(node)
          if (children.length >= MIN_CHILDREN && depthOf(node) >= MIN_DEPTH) {
            const sig = hashSubtree(node)
            const hash = shortHash(sig)
            const start = node.getStart(sf)
            const end = node.getEnd()
            const sampleRaw = src.slice(start, end)
            const sample = sampleRaw.length > MAX_SAMPLE_LENGTH
              ? sampleRaw.slice(0, MAX_SAMPLE_LENGTH) + "\n…"
              : sampleRaw
            const { line } = sf.getLineAndCharacterOfPosition(start)
            const occ = {
              prototype: proto.name,
              file: relative(ROOT, file),
              line: line + 1,
              tag: getOpeningTagName(node),
              sig,
              sample,
            }
            if (!occurrencesByHash.has(hash)) occurrencesByHash.set(hash, [])
            occurrencesByHash.get(hash).push(occ)
          }
        }
        ts.forEachChild(node, visit)
      }
      visit(sf)
    }
  }

  if (!existsSync(CANDIDATES_DIR)) mkdirSync(CANDIDATES_DIR, { recursive: true })

  const activeHashes = new Set()
  let written = 0

  for (const [hash, occurrences] of occurrencesByHash) {
    const prototypes = new Set(occurrences.map((o) => o.prototype))
    const withinHit = [...prototypes].some(
      (p) => occurrences.filter((o) => o.prototype === p).length >= MIN_OCCURRENCES_WITHIN_PROTOTYPE
    )
    const acrossHit = prototypes.size >= MIN_OCCURRENCES_ACROSS_PROTOTYPES
    if (!withinHit && !acrossHit) continue

    activeHashes.add(hash)
    const file = join(CANDIDATES_DIR, `${hash}.json`)
    const existing = loadExistingCandidate(file)
    const candidate = {
      hash,
      suggestedName: existing?.suggestedName || suggestNameFromTag(occurrences[0].tag),
      tag: occurrences[0].tag,
      occurrenceCount: occurrences.length,
      prototypeCount: prototypes.size,
      occurrences: occurrences.map((o) => ({
        prototype: o.prototype,
        file: o.file,
        line: o.line,
      })),
      sample: occurrences[0].sample,
      dismissed: existing?.dismissed ?? false,
      dismissedReason: existing?.dismissedReason ?? null,
      firstSeenAt: existing?.firstSeenAt ?? new Date().toISOString().slice(0, 10),
      lastSeenAt: new Date().toISOString().slice(0, 10),
    }
    writeFileSync(file, JSON.stringify(candidate, null, 2) + "\n")
    written++
  }

  clearStaleCandidates(activeHashes)

  console.log(`scan-prototypes: ${written} candidate(s) written to ${relative(ROOT, CANDIDATES_DIR)}/`)
}

main()
