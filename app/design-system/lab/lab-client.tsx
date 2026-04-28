"use client"

import * as React from "react"
import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  ExternalLink,
  GitPullRequest,
  Eye,
  EyeOff,
  RotateCcw,
  Trash2,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { drafts } from "@/components/_lab/_drafts/_index"

const REPO = "divljak/metro-prototype"

export type Candidate = {
  hash: string
  suggestedName: string
  tag: string
  occurrenceCount: number
  prototypeCount: number
  occurrences: { prototype: string; file: string; line: number }[]
  sample: string
  dismissed: boolean
  dismissedReason: string | null
  firstSeenAt: string
  lastSeenAt: string
  approved?: boolean
  draftSlug?: string | null
  componentName?: string | null
}

function promoteUrl(slug: string, componentName: string) {
  const params = new URLSearchParams({
    quick_pull: "1",
    title: `Promote: ${componentName}`,
    labels: "design-system,promotion",
  })
  const body = [
    `## Promotes draft \`${slug}\` to the design system`,
    ``,
    `Moves \`components/_lab/_drafts/${slug}.tsx\` → \`components/ui/<final-name>.tsx\``,
    ``,
    `## Checklist`,
    `- [ ] Component renamed from auto-generated name`,
    `- [ ] Real prop API (semantic names, no \`prop1\`)`,
    `- [ ] Variants defined via CVA where needed`,
    `- [ ] Showcase entry added to \`app/design-system/page.tsx\``,
    `- [ ] Passes \`npm run lint:tokens\``,
    `- [ ] A11y: keyboard, screen reader, focus states`,
    `- [ ] Responsive across xs / sm / md / lg`,
    `- [ ] Removed from \`components/_lab/_drafts/\` (and \`_index.tsx\` regenerated)`,
    `- [ ] Reviewed by design-system owner (CODEOWNERS gate)`,
  ].join("\n")
  params.set("body", body)
  return `https://github.com/${REPO}/compare/main...?${params.toString()}`
}

function sourceUrl(o: { file: string; line: number }) {
  return `https://github.com/${REPO}/blob/main/${o.file}#L${o.line}`
}

export function LabClient({ candidates }: { candidates: Candidate[] }) {
  return (
    <>
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-foreground">Lab</h1>
          <Badge variant="secondary">Auto-detected</Badge>
        </div>
        <p className="text-lg text-foreground/80 max-w-3xl">
          Patterns the scanner found in approved prototypes. The design-system owner
          approves a candidate (which scaffolds a draft component), refines it, then
          promotes to <code>components/ui/</code>.
        </p>
        <p className="text-sm text-foreground/60 mt-3">
          Run scan: <code>npm run scan</code> · Candidates:{" "}
          <code>components/_lab/_candidates/</code> · Drafts:{" "}
          <code>components/_lab/_drafts/</code>
        </p>
      </div>

      <Separator className="mb-8" />

      <DraftsSection />

      <Separator className="my-12" />

      <CandidatesSection candidates={candidates} />

      <Separator className="my-12" />

      <section className="max-w-3xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4">How this works</h2>
        <ol className="space-y-2 text-foreground/80 list-decimal pl-5">
          <li>Designers/PMs build prototypes in <code>app/&lt;prototype&gt;/</code>.</li>
          <li>
            Publishing a prototype = setting <code>status: &quot;approved&quot;</code>{" "}
            in its <code>meta.ts</code>.
          </li>
          <li>
            <code>npm run scan</code> walks approved prototypes, finds repeated JSX
            patterns, writes <strong>Candidates</strong>.
          </li>
          <li>
            Owner clicks <strong>Approve as component</strong> → scaffolds a{" "}
            <strong>Draft</strong> (a real TSX file) with imports auto-derived from
            the source. Live preview becomes available.
          </li>
          <li>
            Owner refines the draft in editor (rename, prop API, variants, a11y,
            tokens), commits, then clicks <strong>Promote to ui/</strong> → opens a
            PR template that moves the file to <code>components/ui/</code>.
          </li>
          <li>CODEOWNERS gates the merge. Component now lives in the design system.</li>
        </ol>
      </section>
    </>
  )
}

function DraftsSection() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  async function discard(slug: string) {
    if (!confirm(`Discard draft "${slug}"?`)) return
    await fetch("/api/lab/discard-draft", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug }),
    })
    startTransition(() => router.refresh())
  }

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-2xl font-semibold text-foreground">Drafts</h2>
        <Badge variant="outline">{drafts.length}</Badge>
      </div>
      <p className="text-sm text-foreground/70 mb-6">
        Approved candidates scaffolded as real components. Refine them in your editor,
        then promote to <code>components/ui/</code>.
      </p>
      {drafts.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-foreground/70">
            No drafts yet. Approve a candidate below to scaffold one.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {drafts.map((d) => (
            <DraftCard
              key={d.slug}
              slug={d.slug}
              componentName={d.componentName}
              Component={d.component}
              pending={pending}
              onDiscard={() => discard(d.slug)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function DraftCard({
  slug,
  componentName,
  Component,
  pending,
  onDiscard,
}: {
  slug: string
  componentName: string
  Component: React.ComponentType<any>
  pending: boolean
  onDiscard: () => void
}) {
  const [error, setError] = useState<Error | null>(null)
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted/40 p-8 flex items-center justify-center min-h-[180px]">
        {error ? (
          <div className="text-sm text-foreground/60 text-center">
            <div className="font-medium mb-1">Preview failed to render</div>
            <div className="text-xs">{error.message}</div>
            <div className="text-xs mt-2">
              Refine{" "}
              <code>components/_lab/_drafts/{slug}.tsx</code> to fix.
            </div>
          </div>
        ) : (
          <ErrorBoundary onError={setError}>
            <Component />
          </ErrorBoundary>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-mono">{componentName}</CardTitle>
        <CardDescription className="font-mono text-xs">
          components/_lab/_drafts/{slug}.tsx
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-xs text-foreground/70">
          Refine in your editor:{" "}
          <code className="text-foreground">code components/_lab/_drafts/{slug}.tsx</code>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <a href={promoteUrl(slug, componentName)} target="_blank" rel="noreferrer">
              <GitPullRequest className="mr-2 h-4 w-4" />
              Promote to ui/
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={onDiscard}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Discard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

class ErrorBoundary extends React.Component<
  { onError: (e: Error) => void; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: Error) {
    this.props.onError(error)
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function CandidatesSection({ candidates }: { candidates: Candidate[] }) {
  const [showDismissed, setShowDismissed] = useState(false)
  const [showApproved, setShowApproved] = useState(false)
  const visible = useMemo(() => {
    return candidates.filter((c) => {
      if (c.approved && !showApproved) return false
      if (c.dismissed && !showDismissed) return false
      return true
    })
  }, [candidates, showDismissed, showApproved])
  const open = candidates.filter((c) => !c.dismissed && !c.approved).length
  const approvedCount = candidates.filter((c) => c.approved).length
  const dismissedCount = candidates.filter((c) => c.dismissed).length

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-2xl font-semibold text-foreground">Candidates</h2>
        <Badge variant="outline">{open}</Badge>
      </div>
      <p className="text-sm text-foreground/70 mb-4">
        Auto-detected patterns awaiting triage. Approve scaffolds a draft you can
        refine; Dismiss makes the scanner stop suggesting it.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowApproved((s) => !s)}
        >
          {showApproved ? "Hide approved" : `Show approved (${approvedCount})`}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDismissed((s) => !s)}
        >
          {showDismissed ? "Hide dismissed" : `Show dismissed (${dismissedCount})`}
        </Button>
      </div>

      {visible.length === 0 ? (
        <EmptyCandidates hasAny={candidates.length > 0} />
      ) : (
        <div className="space-y-6">
          {visible.map((c) => (
            <CandidateCard key={c.hash} candidate={c} />
          ))}
        </div>
      )}
    </section>
  )
}

function CandidateCard({ candidate }: { candidate: Candidate }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function setDismissed(dismissed: boolean) {
    setError(null)
    await fetch("/api/lab/dismiss", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ hash: candidate.hash, dismissed }),
    })
    startTransition(() => router.refresh())
  }

  async function approve() {
    setError(null)
    const res = await fetch("/api/lab/approve", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ hash: candidate.hash }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || "approve failed")
      return
    }
    startTransition(() => router.refresh())
  }

  return (
    <Card
      className={
        candidate.dismissed
          ? "opacity-60"
          : candidate.approved
            ? "border-success"
            : undefined
      }
    >
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <CardTitle className="text-xl font-mono">
                {candidate.suggestedName}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-xs">
                {candidate.hash}
              </Badge>
              {candidate.approved && (
                <Badge className="bg-success text-success-foreground">Approved</Badge>
              )}
              {candidate.dismissed && <Badge variant="secondary">Dismissed</Badge>}
            </div>
            <CardDescription>
              Pattern based on <code>{candidate.tag}</code>. Seen{" "}
              <strong>{candidate.occurrenceCount}</strong> times across{" "}
              <strong>{candidate.prototypeCount}</strong> prototype(s).
              {candidate.approved && candidate.draftSlug && (
                <>
                  {" "}
                  Scaffolded as draft <code>{candidate.draftSlug}</code>.
                </>
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-sm text-primary hover:underline"
          >
            {open ? "Hide sample ▾" : "Show sample ▸"}
          </button>
          {open && (
            <pre className="mt-2 max-h-80 overflow-auto rounded-md bg-muted p-3 text-xs leading-relaxed">
              <code>{candidate.sample}</code>
            </pre>
          )}
        </div>

        <div>
          <div className="text-sm font-medium text-foreground/70 mb-2">Occurrences</div>
          <ul className="space-y-1 text-sm">
            {candidate.occurrences.map((o, i) => (
              <li key={i} className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {o.prototype.replace(/^app\//, "")}
                </Badge>
                <a
                  href={sourceUrl(o)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-primary hover:underline truncate"
                >
                  {o.file}:{o.line}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {error && (
          <div className="text-xs text-destructive">Error: {error}</div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {candidate.dismissed ? (
            <Button
              variant="outline"
              size="sm"
              disabled={pending}
              onClick={() => setDismissed(false)}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Restore
            </Button>
          ) : candidate.approved ? (
            <span className="text-sm text-foreground/60 italic">
              Scaffolded — see Drafts above.
            </span>
          ) : (
            <>
              <Button size="sm" disabled={pending} onClick={approve}>
                <Sparkles className="mr-2 h-4 w-4" />
                Approve as component
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pending}
                onClick={() => setDismissed(true)}
              >
                <EyeOff className="mr-2 h-4 w-4" />
                Dismiss
              </Button>
              <Button asChild variant="ghost" size="sm">
                <a
                  href={sourceUrl(candidate.occurrences[0])}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View first occurrence
                </a>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyCandidates({ hasAny }: { hasAny: boolean }) {
  return (
    <Card>
      <CardContent className="py-10 text-center text-foreground/70">
        {hasAny
          ? "Nothing to triage in the current view. Toggle filters above to see other candidates."
          : "No candidates yet. Mark a prototype as approved and run npm run scan."}
      </CardContent>
    </Card>
  )
}
