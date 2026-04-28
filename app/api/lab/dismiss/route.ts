import { NextRequest, NextResponse } from "next/server"
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const CANDIDATES_DIR = join(process.cwd(), "components", "_lab", "_candidates")

export async function POST(req: NextRequest) {
  const { hash, dismissed, reason } = await req.json()
  if (!hash || typeof hash !== "string" || !/^[a-f0-9]+$/.test(hash)) {
    return NextResponse.json({ error: "invalid hash" }, { status: 400 })
  }
  const file = join(CANDIDATES_DIR, `${hash}.json`)
  if (!existsSync(file)) {
    return NextResponse.json({ error: "candidate not found" }, { status: 404 })
  }
  const candidate = JSON.parse(readFileSync(file, "utf8"))
  candidate.dismissed = !!dismissed
  candidate.dismissedReason = dismissed ? reason ?? null : null
  writeFileSync(file, JSON.stringify(candidate, null, 2) + "\n")
  return NextResponse.json({ ok: true })
}
