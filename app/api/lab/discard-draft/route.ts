import { NextRequest, NextResponse } from "next/server"
import { readFileSync, writeFileSync, existsSync, rmSync, readdirSync } from "node:fs"
import { join } from "node:path"
// @ts-ignore - .mjs ESM module without TS types
import { regenerateDraftsIndex } from "../../../../scripts/lib/scaffold-component.mjs"

const ROOT = process.cwd()
const CANDIDATES_DIR = join(ROOT, "components", "_lab", "_candidates")
const DRAFTS_DIR = join(ROOT, "components", "_lab", "_drafts")

export async function POST(req: NextRequest) {
  const { slug } = await req.json()
  if (!slug || typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 })
  }
  const draftPath = join(DRAFTS_DIR, `${slug}.tsx`)
  if (!existsSync(draftPath)) {
    return NextResponse.json({ error: "draft not found" }, { status: 404 })
  }
  rmSync(draftPath)

  if (existsSync(CANDIDATES_DIR)) {
    for (const f of readdirSync(CANDIDATES_DIR)) {
      if (!f.endsWith(".json")) continue
      const file = join(CANDIDATES_DIR, f)
      const candidate = JSON.parse(readFileSync(file, "utf8"))
      if (candidate.draftSlug === slug) {
        candidate.approved = false
        candidate.draftSlug = null
        candidate.componentName = null
        writeFileSync(file, JSON.stringify(candidate, null, 2) + "\n")
      }
    }
  }

  writeFileSync(join(DRAFTS_DIR, "_index.tsx"), regenerateDraftsIndex(DRAFTS_DIR))

  return NextResponse.json({ ok: true })
}
