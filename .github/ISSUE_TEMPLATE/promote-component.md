---
name: Promote component from Lab
about: Nominate a component in components/_lab/ for promotion to the design system
title: "Promote: <ComponentName>"
labels: ["design-system", "promotion"]
---

## Component
`components/_lab/<file>.tsx`

## Owner
@designer-handle

## Description
Short summary of what the component does and why it's ready for the design system.

## Used in
- `app/<page>/page.tsx`

## Promotion checklist
- [ ] All variants documented in source (CVA pattern)
- [ ] Showcase entry added to `app/design-system/page.tsx`
- [ ] Passes `npm run lint:tokens` (no raw hex / arbitrary sizes)
- [ ] A11y: keyboard, screen reader, focus states
- [ ] Responsive across xs / sm / md / lg breakpoints
- [ ] Reviewed by design-system owner
