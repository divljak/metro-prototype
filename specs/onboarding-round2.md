# Onboarding — Round 2 (Full Verification)

After the provisional account is live and the customer has been to `/dashboard/provisional`, Round 2 unlocks full functionality. Mock data only; no real APIs.

Companion docs:
- `specs/onboarding-round1.md` — provisional account flow
- `app/dashboard/provisional/page.tsx` — the dashboard that links into Round 2 (source of truth lives in code)
- `lib/constants/timing.ts` — mock delays
- `STYLE-DNA.md` — visual language

Flow: secure-account → dashboard → (business-activity, mandate, online-banking, documents in dynamic order) → complete. Two placeholder routes (subscription, lending-preassessment) hang off the provisional dashboard's product-preview cards.

---

## 1. `/onboarding/round2/secure-account`
- Title: "Secure your account".
- Description: "Create a passcode to protect your business banking".
- Two passcode inputs (6 digits each):
  - "Create 6-digit passcode"
  - "Confirm passcode"
- Validation: exactly 6 digits, must match.
- Biometric toggle card:
  - Title: "Enable Face ID / Touch ID"
  - Description: "Sign in quickly and securely using biometrics"
  - Checkmark when enabled.
- Info alert: "Your passcode is stored securely on your device".
- Primary CTA: "Continue" → `/onboarding/round2/dashboard`.
- Secondary CTA: "Skip for now" → `/dashboard`.

## 2. `/onboarding/round2/dashboard`
- Title: "Finish setting up your business banking".
- `ProgressSteps` horizontal indicator.
- Alert: "Your provisional account is active" with limit details.
- `ChecklistItem` per module:
  - Tell us about your business activity
  - Set up approvals and mandates
  - Choose your online banking setup
  - Upload requested documents
- Each item clickable; status badge (todo/done).
- Module order is dynamic — see `computeModuleOrder` rules below.
- "Complete setup" button appears only when all required modules are done.

## 3. `/onboarding/round2/business-activity` (3-step wizard)
- Step 1: Countries — select countries, render as `Badge` chips.
- Step 2: Payment methods — select methods, `Badge` chips.
- Step 3: Cash percentage — `Slider` 0–100%.
- Next/Back navigation; marks the module complete on finish.

## 4. `/onboarding/round2/mandate` (2-step wizard)
- Step 1: Mandate type — Single / Dual / Any two.
- Step 2: People permissions — `Switch` per person.
- Shows approval-rules explanation.
- Marks the module complete on finish.

## 5. `/onboarding/round2/online-banking` (2-step wizard)
- Step 1: Plan selection — Essential / Plus / Premium cards.
- Step 2: Daily limit — preset buttons plus custom input.
- Marks the module complete on finish.

## 6. `/onboarding/round2/documents`
- Title: "Upload requested documents".
- `UploadCard` per document:
  - Business address proof (required)
  - Trading proof (required)
  - Shareholder agreement (optional)
- Each card: upload button, filename when uploaded.
- Marks the module complete when both required docs are uploaded.

## 7. `/onboarding/round2/complete`
- Success screen: "Your account is ready!"
- Celebration UI with success icon.
- "What's unlocked" list:
  - Full payment limits
  - International transfers
  - Multi-currency accounts
  - Debit cards
  - Lending access
- CTA: "Go to your dashboard" → `/dashboard`.

## 8. `/onboarding/round2/subscription` (placeholder)
- Title: "Business plans".
- Large `Package` icon.
- "Coming soon" message.
- Back button.

## 9. `/onboarding/round2/lending-preassessment` (placeholder)
- Title: "Business lending".
- Large `TrendingUp` icon.
- "Coming soon" message.
- Explanation: "Available after full verification".
- Back button.

---

## Dynamic module ordering (`computeModuleOrder`)

If the business profile is **low risk**:
- Turnover: £0–250K
- Employees: 0–2
- Cash: false
- International: false

Then on the Round 2 dashboard:
- Mandate first.
- Hide or defer business activity.
- Mark documents optional.

Otherwise, default order: business-activity → mandate → online-banking → documents.

---

## Cross-cutting behaviour

- All wizard steps persist to Zustand on every change.
- Checkpoint resume continues to apply across Round 2 routes.
- Same auto-save, loading, and mobile-first rules as Round 1 (see `specs/onboarding-round1.md`).
