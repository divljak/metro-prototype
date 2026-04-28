# Metro Bank NextGen — Agent Brief

## What this is
Mobile-first prototype for Metro Bank's business account onboarding, provisional dashboard, and (forthcoming) RM workbench / broker portal.
Stack: Next.js 14 (App Router) · TypeScript · Tailwind · shadcn/ui · Zustand.

Everything is mocked. No real APIs, no real auth, no real uploads.

## Brand voice (3 rules)
1. **Trust through simplicity.** Flat UI, no shadows, no decorative gradients.
2. **Direct copy.** Plain English, second person, no banking jargon.
3. **Blue 75% / Red 25%.** Blue for navigation and confirmations. Red ONLY for critical money actions (Pay, Transfer, Apply Now).

## Tokens — source of truth: `tailwind.config.ts` + `app/globals.css`
```
Brand:    primary=#0046AD  accent=#DE1927  navy=#000D45  off-white=#FEF9F9
Semantic: success=#16A34A  warning=#EA580C  destructive=#C01622  info=#0046AD
Radius:   card=12px  button=pill  input=4px
Touch:    min 44px on every interactive element
```
If `STYLE-DNA.md` and `tailwind.config.ts` ever disagree, the config wins. Update both.

## Where things live
```
app/onboarding/round1            → provisional account journey (13 screens)
app/onboarding/round2            → full verification journey (9 screens)
app/dashboard/provisional        → post-Round-1 holding state
app/start                        → entry point
app/design-system                → live token + component reference
components/onboarding            → journey-specific composites (do edit)
components/ui                    → shadcn primitives (don't edit — wrap them)
lib/stores                       → Zustand stores
lib/constants/timing.ts          → mock delays referenced by every screen
hooks/use-checkpoint.ts          → localStorage checkpoint resume
specs/                           → per-flow UX intent (read before editing a screen)
project_knowledge/               → RFI answers + persona briefs
```

## Rules for agents
- Read `STYLE-DNA.md` before any visual change. Never invent colors.
- Read the matching file in `specs/` before editing a screen — it has the per-screen copy and behaviour intent.
- Use shadcn primitives from `components/ui`. Don't restyle them — wrap them.
- Every new screen is a new route under `app/`. No screens in `components/`.
- Every interactive element gets a focus ring (Metro Blue, 2px, no offset).
- No `box-shadow`. `globals.css` enforces this; don't override it.
- Forms use `react-hook-form` + `zod`. Cross-screen state uses Zustand.
- Mock timings live in `lib/constants/timing.ts`. Don't hardcode new ones.

## Reference docs (read on demand, not by default)
- `STYLE-DNA.md` — full visual language, components, copy patterns.
- `DESIGN_SYSTEM.md` — implementation-level Tailwind/shadcn notes (subset of STYLE-DNA).
- `specs/onboarding-round1.md` — Round 1 screens (welcome → provisional).
- `specs/onboarding-round2.md` — Round 2 screens (secure-account → complete).
- `MAGICPATCH_PROVISIONAL_DASHBOARD.md` — the dashboard between Round 1 and Round 2.
- `project_knowledge/*.md` — RFI Q&A and persona briefs (RM, broker, customer).
- `product-manager-skill.md` — PM-perspective skill prompts.

## Current focus
Round 2 onboarding polish + provisional dashboard refinement.
