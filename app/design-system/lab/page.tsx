"use client"

import Link from "next/link"
import { ExternalLink, GitPullRequest } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { labRegistry, type LabEntry } from "@/components/_lab/registry"

const REPO = "divljak/metro-prototype"

function nominateUrl(entry: LabEntry) {
  const params = new URLSearchParams({
    template: "promote-component.md",
    title: `Promote: ${entry.name}`,
    labels: "design-system,promotion",
  })
  const body = [
    `## Component`,
    `\`${entry.sourcePath}\``,
    ``,
    `## Owner`,
    entry.owner,
    ``,
    `## Description`,
    entry.description,
    ``,
    `## Used in`,
    entry.usedIn.length > 0
      ? entry.usedIn.map((p) => `- \`${p}\``).join("\n")
      : "_(none yet — describe the intended use case)_",
    ``,
    `## Promotion checklist`,
    `- [ ] All variants documented in source (CVA pattern)`,
    `- [ ] Showcase entry added to \`app/design-system/page.tsx\``,
    `- [ ] Passes \`npm run lint:tokens\` (no raw hex / arbitrary sizes)`,
    `- [ ] A11y: keyboard, screen reader, focus states`,
    `- [ ] Responsive across xs / sm / md / lg breakpoints`,
    `- [ ] Reviewed by design-system owner`,
  ].join("\n")
  params.set("body", body)
  return `https://github.com/${REPO}/issues/new?${params.toString()}`
}

function sourceUrl(entry: LabEntry) {
  return `https://github.com/${REPO}/blob/main/${entry.sourcePath}`
}

export default function LabPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 max-w-7xl">
        <div className="mb-8">
          <Link href="/design-system" className="text-sm text-primary hover:underline">
            ← Back to design system
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-foreground">Lab</h1>
            <Badge variant="secondary">Sandbox</Badge>
          </div>
          <p className="text-lg text-foreground/80 max-w-3xl">
            Components in development. Designers ship from here without being blocked by
            design-system rules. When a component is ready, click <strong>Nominate</strong>{" "}
            to open a promotion issue — a design-system owner reviews and moves it to{" "}
            <code className="text-sm">components/ui/</code>.
          </p>
        </div>

        <Separator className="mb-12" />

        {labRegistry.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {labRegistry.map((entry) => (
              <LabCard key={entry.slug} entry={entry} />
            ))}
          </div>
        )}

        <Separator className="my-12" />

        <section className="prose max-w-3xl">
          <h2 className="text-2xl font-semibold text-foreground mb-4">How this works</h2>
          <ol className="space-y-2 text-foreground/80">
            <li>
              <strong>Build:</strong> Add your component file under{" "}
              <code>components/_lab/</code>, then add an entry to{" "}
              <code>components/_lab/registry.tsx</code>.
            </li>
            <li>
              <strong>Use:</strong> Import from <code>@/components/_lab/...</code> in any
              prototype page. Token lint is relaxed in the sandbox.
            </li>
            <li>
              <strong>Nominate:</strong> When the component feels stable, click the{" "}
              Nominate button on its card.
            </li>
            <li>
              <strong>Review:</strong> A design-system owner triages the issue, requests
              changes if needed, and approves the promotion PR.
            </li>
            <li>
              <strong>Promote:</strong> The PR moves the file to{" "}
              <code>components/ui/</code>, adds a showcase entry, and updates imports.
            </li>
          </ol>
        </section>
      </div>
    </main>
  )
}

function LabCard({ entry }: { entry: LabEntry }) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted/40 p-8 flex items-center justify-center min-h-[180px]">
        {entry.preview}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-xl">{entry.name}</CardTitle>
            <CardDescription className="mt-1">{entry.description}</CardDescription>
          </div>
          <Badge variant="outline" className="shrink-0">
            {entry.owner}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-foreground/60">Added</dt>
            <dd className="text-foreground">{entry.addedAt}</dd>
          </div>
          <div>
            <dt className="text-foreground/60">Source</dt>
            <dd className="truncate font-mono text-xs text-foreground">
              {entry.sourcePath}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-foreground/60">Used in</dt>
            <dd className="text-foreground">
              {entry.usedIn.length > 0 ? (
                <ul className="mt-1 space-y-0.5">
                  {entry.usedIn.map((p) => (
                    <li key={p} className="font-mono text-xs">
                      {p}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-foreground/60 italic">
                  Not yet used in any page
                </span>
              )}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button asChild variant="outline" size="sm">
            <a href={sourceUrl(entry)} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View source
            </a>
          </Button>
          <Button asChild size="sm">
            <a href={nominateUrl(entry)} target="_blank" rel="noreferrer">
              <GitPullRequest className="mr-2 h-4 w-4" />
              Nominate for promotion
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="py-16 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No components in the lab yet
        </h3>
        <p className="text-foreground/70 max-w-md mx-auto">
          Add a file under <code>components/_lab/</code> and register it in{" "}
          <code>components/_lab/registry.tsx</code> to see it here.
        </p>
      </CardContent>
    </Card>
  )
}
