import { NextRequest, NextResponse } from "next/server"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"
// @ts-ignore - .mjs ESM module without TS types
import { scaffoldFromCandidate, regenerateDraftsIndex } from "../../../../scripts/lib/scaffold-component.mjs"

const ROOT = process.cwd()
const CANDIDATES_DIR = join(ROOT, "components", "_lab", "_candidates")
const DRAFTS_DIR = join(ROOT, "components", "_lab", "_drafts")

export async function POST(req: NextRequest) {
  const { hash } = await req.json()
  if (!hash || typeof hash !== "string" || !/^[a-f0-9]+$/.test(hash)) {
    return NextResponse.json({ error: "invalid hash" }, { status: 400 })
  }
  const candidateFile = join(CANDIDATES_DIR, `${hash}.json`)
  if (!existsSync(candidateFile)) {
    return NextResponse.json({ error: "candidate not found" }, { status: 404 })
  }

  const candidate = JSON.parse(readFileSync(candidateFile, "utf8"))
  const { slug, componentName, source } = scaffoldFromCandidate(candidate, ROOT)

  if (!existsSync(DRAFTS_DIR)) mkdirSync(DRAFTS_DIR, { recursive: true })
  const draftPath = join(DRAFTS_DIR, `${slug}.tsx`)
  if (existsSync(draftPath)) {
    return NextResponse.json(
      { error: `a draft named ${slug} already exists; rename or discard it first` },
      { status: 409 }
    )
  }
  writeFileSync(draftPath, source)

  const indexSource = regenerateDraftsIndex(DRAFTS_DIR)
  writeFileSync(join(DRAFTS_DIR, "_index.tsx"), indexSource)

  candidate.approved = true
  candidate.draftSlug = slug
  candidate.componentName = componentName
  candidate.dismissed = false
  writeFileSync(candidateFile, JSON.stringify(candidate, null, 2) + "\n")

  return NextResponse.json({ ok: true, slug, componentName })
}
