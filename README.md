# Metro Bank NextGen

Mobile-first prototype for Metro Bank's business account onboarding, provisional dashboard, and (forthcoming) RM workbench / broker portal.

Everything is mocked. No real APIs, no real auth, no real uploads.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind · shadcn/ui · Zustand · react-hook-form · zod.

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build && npm start  # production build
npm run lint                # eslint
```

## Routes

| Route | What it is |
|---|---|
| `/start` | Entry point |
| `/onboarding/round1/*` | 13-screen provisional account journey |
| `/dashboard/provisional` | Holding state between Round 1 and Round 2 |
| `/onboarding/round2/*` | 9-screen full verification journey |
| `/design-system` | Live token + component reference |

## Where to look next

- **`CLAUDE.md`** — agent brief: brand voice, tokens, file map, rules.
- **`STYLE-DNA.md`** — full visual language and component patterns.
- **`specs/`** — per-screen UX intent. Read before editing a screen.
- **`project_knowledge/`** — RFI answers and persona briefs.
