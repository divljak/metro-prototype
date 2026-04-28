"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ExternalLink, GitPullRequest, Eye, EyeOff, RotateCcw } from "lucide-react"
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
}

function approveUrl(c: Candidate) {
  const params = new URLSearchParams({
    template: "promote-component.md",
    title: `Promote: ${c.suggestedName}`,
    labels: "design-system,promotion",
  })
  const occList =
    c.occurrences.map((o) => `- \`${o.file}:${o.line}\``).join("\n") || "_(none)_"
  const body = [
    `## Auto-detected pattern`,
    `Hash: \`${c.hash}\``,
    `Suggested name: \`${c.suggestedName}\` _(rename as appropriate)_`,
    ``,
    `## Occurrences (${c.occurrenceCount} across ${c.prototypeCount} prototype(s))`,
    occList,
    ``,
    `## Sample`,
    "```tsx",
    c.sample,
    "```",
    ``,
    `## Promotion checklist`,
    `- [ ] Renamed to a semantic name`,
    `- [ ] Prop API designed (not auto-generated literals)`,
    `- [ ] Variants defined via CVA`,
    `- [ ] Showcase entry added to \`app/design-system/page.tsx\``,
    `- [ ] Passes \`npm run lint:tokens\``,
    `- [ ] A11y: keyboard, screen reader, focus states`,
    `- [ ] Responsive across xs / sm / md / lg`,
    `- [ ] Reviewed by design-system owner`,
  ].join("\n")
  params.set("body", body)
  return `https://github.com/${REPO}/issues/new?${params.toString()}`
}

function sourceUrl(o: { file: string; line: number }) {
  return `https://github.com/${REPO}/blob/main/${o.file}#L${o.line}`
}

export function LabClient({ candidates }: { candidates: Candidate[] }) {
  const [showDismissed, setShowDismissed] = useState(false)
  const visible = useMemo(
    () => candidates.filter((c) => showDismissed || !c.dismissed),
    [candidates, showDismissed]
  )
  const dismissedCount = candidates.filter((c) => c.dismissed).length
  const liveCount = candidates.length - dismissedCount

  return (
    <>
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-foreground">Lab</h1>
          <Badge variant="secondary">Auto-detected candidates</Badge>
        </div>
        <p className="text-lg text-foreground/80 max-w-3xl">
          Patterns the scanner found in approved prototypes. The design-system owner
          reviews and either <strong>approves</strong> a candidate (which opens a
          promotion issue) or <strong>dismisses</strong> it (the scanner remembers and
          stops re-suggesting).
        </p>
        <p className="text-sm text-foreground/60 mt-3">
          Scanner: <code>npm run scan</code> · Source of truth:{" "}
          <code>components/_lab/_candidates/</code>
        </p>
      </div>

      <Separator className="mb-8" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="text-sm text-foreground/70">
          <strong className="text-foreground">{liveCount}</strong> open ·{" "}
          <strong className="text-foreground">{dismissedCount}</strong> dismissed
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDismissed((s) => !s)}
        >
          {showDismissed ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" /> Hide dismissed
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" /> Show dismissed ({dismissedCount})
            </>
          )}
        </Button>
      </div>

      {visible.length === 0 ? (
        <EmptyState hasAny={candidates.length > 0} />
      ) : (
        <div className="space-y-6">
          {visible.map((c) => (
            <CandidateCard key={c.hash} candidate={c} />
          ))}
        </div>
      )}

      <Separator className="my-12" />

      <section className="max-w-3xl">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How candidates get here
        </h2>
        <ol className="space-y-2 text-foreground/80 list-decimal pl-5">
          <li>Designers build prototypes in <code>app/&lt;prototype&gt;/</code>.</li>
          <li>
            When a prototype is published, its <code>meta.ts</code> is set to{" "}
            <code>status: &quot;approved&quot;</code>.
          </li>
          <li>
            The scanner (<code>npm run scan</code>) walks approved prototypes, finds
            JSX patterns repeating <strong>3+ times within</strong> or{" "}
            <strong>2+ times across</strong> prototypes, and writes one candidate per
            pattern to <code>components/_lab/_candidates/</code>.
          </li>
          <li>
            The design-system owner reviews this page. <strong>Approve</strong> opens
            a promotion issue with the snippet pre-filled. <strong>Dismiss</strong>{" "}
            marks the candidate as not a component (persists across scans).
          </li>
          <li>
            On approval, the owner opens a PR that adds the cleaned component to{" "}
            <code>components/ui/</code> with a proper name, prop API, variants, and a
            showcase entry. CODEOWNERS gates the merge.
          </li>
        </ol>
      </section>
    </>
  )
}

function CandidateCard({ candidate }: { candidate: Candidate }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  async function setDismissed(dismissed: boolean) {
    await fetch("/api/lab/dismiss", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ hash: candidate.hash, dismissed }),
    })
    startTransition(() => router.refresh())
  }

  return (
    <Card className={candidate.dismissed ? "opacity-60" : undefined}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-xl font-mono">
                {candidate.suggestedName}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-xs">
                {candidate.hash}
              </Badge>
              {candidate.dismissed && <Badge variant="secondary">Dismissed</Badge>}
            </div>
            <CardDescription>
              Pattern based on <code>{candidate.tag}</code>. Seen{" "}
              <strong>{candidate.occurrenceCount}</strong> times across{" "}
              <strong>{candidate.prototypeCount}</strong> prototype(s). Suggested name
              is auto-generated; the reviewer renames during promotion.
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

        {candidate.dismissed && candidate.dismissedReason && (
          <div className="text-xs text-foreground/60 italic">
            Dismissed: {candidate.dismissedReason}
          </div>
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
          ) : (
            <>
              <Button asChild size="sm">
                <a
                  href={approveUrl(candidate)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitPullRequest className="mr-2 h-4 w-4" />
                  Approve as component
                </a>
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

function EmptyState({ hasAny }: { hasAny: boolean }) {
  return (
    <Card>
      <CardContent className="py-16 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {hasAny ? "All candidates dismissed" : "No candidates yet"}
        </h3>
        <p className="text-foreground/70 max-w-md mx-auto">
          {hasAny ? (
            <>Toggle &ldquo;Show dismissed&rdquo; to see what&apos;s been triaged.</>
          ) : (
            <>
              Mark a prototype&apos;s <code>meta.ts</code> as{" "}
              <code>status: &quot;approved&quot;</code>, then run{" "}
              <code>npm run scan</code>.
            </>
          )}
        </p>
      </CardContent>
    </Card>
  )
}
