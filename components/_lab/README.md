# Components Lab

The lab is **not a folder designers add things to**. It's a feed of component
candidates that the scanner auto-detects from approved prototypes.

## How it works

1. **Designers build prototypes** in `app/<prototype>/`. They write whatever
   JSX they need — no thinking about reusable components.
2. **A prototype is published** by flipping its `meta.ts`:
   ```ts
   // app/dashboard/meta.ts
   export const meta = {
     name: "Dashboard",
     status: "approved",  // ← was "draft"
     owner: "@design-team",
   }
   ```
3. **The scanner runs** (`npm run scan`, or wire it into CI) and walks every
   approved prototype. JSX subtrees that repeat **3+ times within** a prototype
   or **2+ times across** prototypes are written as candidates to
   `_candidates/<hash>.json`.
4. **The design-system owner reviews** at
   [`/design-system/lab`](http://localhost:3000/design-system/lab):
   - **Approve as component** opens a pre-filled GitHub issue with the snippet,
     occurrence list, and a promotion checklist. The owner takes that issue
     into a PR that adds a cleaned component to `components/ui/` (renamed,
     proper prop API, variants, a11y, token-compliant). CODEOWNERS gates the
     merge.
   - **Dismiss** marks the candidate as not a component. The flag persists
     across scans — the scanner won't re-suggest it unless restored.

## Designers and PMs do not touch this folder

The whole point of the lab is that the prototyping team is unburdened from
component-authoring. They build prototypes; the scanner finds patterns; the
design-system owner does the cleanup. The folder structure here is internal
plumbing for the scanner.

## What's in this folder

```
_lab/
  _candidates/
    <hash>.json     ← one per detected pattern; written by scripts/scan-prototypes.mjs
  _drafts/
    _index.tsx      ← auto-generated registry of approved drafts (do not edit)
    <slug>.tsx      ← scaffolded component, written when the owner approves a candidate
```

## Drafts: what happens after Approve

Clicking **Approve as component** on a candidate calls `/api/lab/approve`. The
endpoint:

1. Reads the candidate's sample JSX.
2. Re-parses the source file the sample came from to derive the right imports
   (so `Alert`, `Info` etc. are auto-imported from `@/components/ui/alert` and
   `lucide-react` exactly as they were in the prototype).
3. Writes a new TSX file at `_drafts/<slug>.tsx` wrapping the sample in a
   minimal exported component with `className?` and `children?` props.
4. Regenerates `_drafts/_index.tsx` so the lab page can render a live preview.
5. Marks the candidate as `approved: true` and stores the draft slug.

The scaffold is a starting point — it's *not* design-system-ready. The owner
refines the draft (renames, defines a real prop API, adds variants, fixes
tokens, threads `className`), then clicks **Promote to ui/** on the draft
card to open a PR template moving the file from `_drafts/` into `ui/`.

> The lab API routes mutate files at runtime. This works in `npm run dev` but
> not in production builds (read-only filesystem). The lab is intended as a
> developer/reviewer tool used locally.

## Tunables

In `scripts/scan-prototypes.mjs`:

- `MIN_OCCURRENCES_WITHIN_PROTOTYPE` (default 3) — how many times a pattern
  must appear in one prototype to qualify.
- `MIN_OCCURRENCES_ACROSS_PROTOTYPES` (default 2) — minimum number of distinct
  prototypes a pattern must appear in.
- `MIN_DEPTH` (default 2) and `MIN_CHILDREN` (default 3) — filters out trivial
  shapes.

Raise these if the lab feels noisy; lower them if you suspect candidates are
being missed.

## Limits of automated detection

The scanner finds **structural** repetition (tag tree shapes). It does not:

- Detect semantically similar but structurally different patterns.
- Suggest good names. The `suggestedName` is always a placeholder; the owner
  renames during promotion.
- Replace human judgment about whether a pattern *should* become a component.
  Some repetition is incidental, not signal.

Expect to dismiss a meaningful share of candidates. That's normal — the
scanner's job is to surface possibilities, not make decisions.
