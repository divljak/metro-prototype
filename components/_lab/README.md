# Components Lab

A sandbox for new components. Designers ship from here without being blocked by
design-system rules. When a component is ready, it gets promoted to
`components/ui/`.

## Why this exists

Without a lab folder, every new component either lands in `components/ui/`
(forcing premature design-system review) or lives unstructured inside a feature
folder (causing duplication and drift). The lab gives designers a clear,
fast-moving space and the design-system owner a clear gate.

## Adding a component

1. Create `components/_lab/<your-component>.tsx`. Use Metro tokens where you can,
   but ad-hoc styles are tolerated here.
2. Add an entry to [`registry.tsx`](./registry.tsx):

   ```tsx
   {
     slug: "your-component",
     name: "YourComponent",
     owner: "@your-handle",
     description: "What it does and why it might belong in the design system.",
     addedAt: "YYYY-MM-DD",
     sourcePath: "components/_lab/your-component.tsx",
     usedIn: [],
     component: YourComponent,
     preview: <YourComponent prop="..." />,
   }
   ```

3. Import it in any page via `@/components/_lab/your-component`.
4. Visit `/design-system/lab` to see it in the gallery.

## Nominating for promotion

When the component feels stable:

1. Open `/design-system/lab` and click **Nominate for promotion** on its card.
   That opens a pre-filled GitHub issue using the
   [`promote-component`](../../.github/ISSUE_TEMPLATE/promote-component.md)
   template.
2. The design-system owner triages: requests changes, asks for variants, or
   approves.
3. Approval → open the **promotion PR** which:
   - Moves `components/_lab/<file>.tsx` → `components/ui/<file>.tsx`
   - Adds a showcase entry to `app/design-system/page.tsx`
   - Updates all imports (`_lab/foo` → `ui/foo`)
   - Removes the registry entry from `_lab/registry.tsx`
   - Passes `npm run lint:tokens`
4. `CODEOWNERS` requires the owner's review on the promotion PR before merge.

## What "ready" looks like

A component is ready to promote when:

- It uses Metro tokens (no raw hex, no arbitrary fixed sizes — same rule that
  applies to `components/ui/`).
- All visual variants are expressed via [CVA](https://cva.style) like the other
  primitives in `components/ui/`.
- It works across `xs / sm / md / lg` breakpoints.
- It passes a basic a11y check (keyboard navigation, focus states, ARIA where
  relevant).
- There is a clear use case — either it's already used in 1+ page or there's a
  near-term plan documented in the issue.

## Decay

Anything in `_lab/` older than ~60 days with no usage gets a "delete or
promote?" issue. The lab is a sandbox, not a graveyard.
