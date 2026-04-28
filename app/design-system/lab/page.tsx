import { readdirSync, readFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import Link from "next/link"
import { LabClient, type Candidate } from "./lab-client"

const CANDIDATES_DIR = join(process.cwd(), "components", "_lab", "_candidates")

function readCandidates(): Candidate[] {
  if (!existsSync(CANDIDATES_DIR)) return []
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"))
  const out: Candidate[] = []
  for (const f of files) {
    try {
      out.push(JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")))
    } catch {}
  }
  out.sort((a, b) => {
    if (a.dismissed !== b.dismissed) return a.dismissed ? 1 : -1
    return b.occurrenceCount - a.occurrenceCount
  })
  return out
}

export default function LabPage() {
  const candidates = readCandidates()
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 max-w-7xl">
        <div className="mb-8">
          <Link href="/design-system" className="text-sm text-primary hover:underline">
            ← Back to design system
          </Link>
        </div>
        <LabClient candidates={candidates} />
      </div>
    </main>
  )
}
