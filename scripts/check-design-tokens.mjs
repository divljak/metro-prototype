#!/usr/bin/env node
// Fails CI when consumer code uses raw hex colors or arbitrary Tailwind
// color/size literals instead of design tokens.
//
// What this catches (the real drift patterns):
//   - Raw hex anywhere outside design tokens:       #DE1927, #000d45
//   - Arbitrary color utilities:                    bg-[#ff0000], text-[rgb(...)]
//   - Arbitrary fixed sizes:                        w-[137px], text-[13px], p-[7px]
//
// What this does NOT catch (legitimate escapes):
//   - calc() expressions:                           w-[calc(100vw-3rem)]
//   - CSS variable references:                      h-[var(--radix-...)]
//   - Geometry/positioning offsets:                 left-[50%], top-[50%]
//
// Allow-listed locations:
//   - app/design-system/**     (showcase swatches, spec-by-example)
//   - components/_lab/**       (sandbox; not yet promoted)
//   - components/ui/**         (blessed primitives; reviewed at the boundary)
//
// Run:    node scripts/check-design-tokens.mjs

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative, sep } from "node:path"

const ROOT = process.cwd()
const SCAN_DIRS = ["app", "components"]
const EXTS = new Set([".ts", ".tsx"])

const ALLOW_PREFIXES = [
  join("app", "design-system"),
  join("components", "_lab"),
  join("components", "ui"),
]

const HEX_LITERAL = /#[0-9A-Fa-f]{3,8}\b/
const ARBITRARY_COLOR = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|divide|outline|decoration|caret|accent|placeholder)-\[(?!var\(|--|calc\()[^\]]+\]/
const ARBITRARY_FIXED_SIZE = /\b(?:w|h|min-w|min-h|max-w|max-h|p|px|py|pl|pr|pt|pb|m|mx|my|ml|mr|mt|mb|gap|space-x|space-y|text|leading|tracking)-\[\d+(?:\.\d+)?(?:px|rem|em)\]/

const violations = []

function isAllowed(rel) {
  return ALLOW_PREFIXES.some((p) => rel === p || rel.startsWith(p + sep))
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry.startsWith(".")) continue
      yield* walk(full)
    } else {
      yield full
    }
  }
}

function checkFile(absPath) {
  const rel = relative(ROOT, absPath)
  if (isAllowed(rel)) return
  const ext = absPath.slice(absPath.lastIndexOf("."))
  if (!EXTS.has(ext)) return

  const src = readFileSync(absPath, "utf8")
  const lines = src.split("\n")

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) continue

    if (HEX_LITERAL.test(line)) {
      violations.push({ file: rel, line: i + 1, rule: "no-raw-hex", snippet: line.trim().slice(0, 140) })
    }
    if (ARBITRARY_COLOR.test(line)) {
      violations.push({ file: rel, line: i + 1, rule: "no-arbitrary-color", snippet: line.trim().slice(0, 140) })
    }
    if (ARBITRARY_FIXED_SIZE.test(line)) {
      violations.push({ file: rel, line: i + 1, rule: "no-arbitrary-fixed-size", snippet: line.trim().slice(0, 140) })
    }
  }
}

for (const d of SCAN_DIRS) {
  const abs = join(ROOT, d)
  try {
    statSync(abs)
  } catch {
    continue
  }
  for (const f of walk(abs)) checkFile(f)
}

if (violations.length === 0) {
  console.log("design-tokens: ok")
  process.exit(0)
}

console.error(`design-tokens: ${violations.length} violation(s)\n`)
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  [${v.rule}]  ${v.snippet}`)
}
console.error(
  "\nUse Metro tokens defined in tailwind.config.ts / app/globals.css instead of raw values."
)
console.error(
  "Prototyping something not yet in the design system? Put it in components/_lab/ — see components/_lab/README.md."
)
process.exit(1)
