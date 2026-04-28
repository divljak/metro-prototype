# Design System Governance — Concept

A lightweight idea for keeping the design system clean as more designers and PMs prototype in parallel. Stack-agnostic.

## The problem

When five+ people are prototyping, components either:
- Get added directly to the design system without review (drift, inconsistency), or
- Live duplicated across feature folders (duplication, no reuse)

We want designers and PMs to **never think about components** while prototyping, and the design system to stay clean.

## The idea, in three moves

### 1. Token enforcement at the lint layer
A simple lint check that fails CI when consumer code uses raw hex colors or arbitrary fixed sizes outside of allowed locations (the design-system primitives, the showcase page, the prototype sandbox). Drift becomes a CI error, not a debate.

### 2. A clear role split
- **Designers and PMs**: build prototypes. They flip a `status` flag on each prototype to "approved" when it's published. That's their only ceremony.
- **Design-system owner** (one person, gated via `CODEOWNERS`): reviews candidates, refines them, owns the final shape of every component that lands in the blessed library.

### 3. A scanner that turns approved prototypes into component candidates
A script walks every prototype marked "approved" and finds repeated JSX patterns (3+ times within a prototype, or 2+ times across prototypes). Each pattern becomes a **candidate** in a feed.

The owner browses a "Lab" page that lists candidates. For each one, they either:
- **Approve** → a real component file gets scaffolded automatically with auto-derived imports. The owner refines it (rename, prop API, variants, a11y, tokens) and then opens a PR moving it into the blessed library.
- **Dismiss** → the scanner remembers and stops re-suggesting that pattern.

Designers and PMs are never pinged. They're not asked to clean up. They keep prototyping.

## Why this works

- **No new ceremony for designers/PMs** — flipping one flag per published prototype is the entire ask.
- **The owner does the cleanup, not the designer** — taste, naming, variants, a11y are exactly the design-system role.
- **The scanner removes boilerplate, not judgment** — auto-extraction gives the owner a starting JSX skeleton; everything design-quality stays human.
- **No merge-conflict registry** — patterns are detected, not manually registered. Designers don't touch a shared file.

## Honest limits

- **Auto-detection finds structural repetition, not semantic similarity.** Expect to dismiss a meaningful share of candidates.
- **Auto-naming is bad.** The scaffold's suggested name is always a placeholder. The owner renames during refinement.
- **The lab UI is a local-dev tool.** The buttons mutate files, which only works in dev — production deploys can show a read-only view of the page but can't trigger approvals/dismissals.
- **Threshold tuning matters.** Too low → noise. Too high → real candidates get missed. Start conservative, adjust.

## What you need to make it work

Roughly five pieces:

1. A `meta.ts` (or equivalent) per prototype with a `status` field.
2. A scanner script that walks approved prototypes, hashes JSX subtrees, and emits candidate records.
3. A "Lab" page that renders the candidate feed with **Approve** / **Dismiss** actions.
4. A scaffolder that turns an approved candidate into a real (refinable) component file with auto-derived imports.
5. A `CODEOWNERS` rule that gates merges into the blessed library to the design-system owner.

The exact implementation depends on your stack. Token enforcement and `CODEOWNERS` are universal; the scanner and lab page need a parser appropriate to your component framework (Babel/TypeScript AST for JSX, etc.).

## The shape of the workflow, end to end

```
designer publishes prototype
        │
        ▼
flips meta.ts: status = "approved"
        │
        ▼
scanner runs (locally or in CI)
        │
        ▼
candidates appear in /lab feed
        │
        ▼
owner clicks Approve  ─────────────►  scaffold lands as a refinable file
                                              │
                                              ▼
                                    owner renames, defines props,
                                    adds variants, fixes tokens, a11y
                                              │
                                              ▼
                                    PR moves it into blessed library
                                              │
                                              ▼
                                CODEOWNERS gate → merge → done
```

The same pattern works in Next.js, Vite, plain React, anything else with a JSX/TSX-like component model.
