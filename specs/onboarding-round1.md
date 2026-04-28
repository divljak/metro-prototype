# Onboarding — Round 1 (Provisional Account)

Per-screen UX intent for the 13 screens that take a customer from welcome to a working provisional account. Mock data only; no real APIs.

Companion docs:
- `specs/onboarding-round2.md` — full verification flow
- `app/dashboard/provisional/page.tsx` — the dashboard shown between Round 1 and Round 2 (source of truth lives in code)
- `lib/constants/timing.ts` — mock delays referenced below
- `STYLE-DNA.md` — visual language and components

Flow: welcome → login → passphrase → lookup-business → confirm-business → profile-turnover → profile-employees → profile-cash-international → people → invite → kyc → background-checks → provisional → /dashboard/provisional

---

## 1. `/onboarding/round1/welcome`
- Hero with Metro Bank logo (M in circle).
- Title: "Open your Business Account".
- Benefits list with checkmarks:
  - Provisional account in under 10 minutes
  - Free business banking for 18 months
  - Instant payments with no hidden fees
  - Multi-currency accounts included
  - Dedicated support team
- `TimeEstimate` showing "~10 minutes remaining".
- Primary CTA: "Start Application" → `/onboarding/round1/login`.
- If a checkpoint exists in localStorage, show resume banner with "Continue" and "Start fresh".

## 2. `/onboarding/round1/login` (magic link — no password)
- Title: "Start or continue your application".
- Email input only.
- Optional phone input for SMS updates.
- Info alert: "Secure & Simple: No password to remember. The link expires in 7 days and works on any device."
- Button: "Send me the link".
- After `MAGIC_LINK_SEND_MS`: success state "Check your email".
- Auto-redirect to `/onboarding/round1/passphrase` after `MAGIC_LINK_REDIRECT_MS`.

## 3. `/onboarding/round1/passphrase`
- Title: "Verify your identity".
- Display box showing 3 generated words with dots between them, e.g. `mountain • tiger • palace`.
- 3 input fields, one per word.
- Validation: case-insensitive exact match; verification delay `PASSPHRASE_VERIFY_MS`.
- Error alert if mismatch.
- Info text: "This extra step ensures only you can access your application".

## 4. `/onboarding/round1/lookup-business`
- Title: "Find your business".
- Search input (min 2 chars triggers filter).
- Filters mock company list by name and address.
- Results render as company cards: name, address, type.
- Selecting a card stores it in Zustand and continues.

## 5. `/onboarding/round1/confirm-business`
- Title: "Confirm your business details".
- Shows: company name, address, type.
- Lists directors and PSCs (Persons with Significant Control).
- Primary CTA: "This is correct".

## 6. `/onboarding/round1/profile-turnover`
- Title: "What is your annual turnover?"
- 4 `CardSelect` options:
  - £0 – £250K (Early stage or small business)
  - £250K – £1M (Growing business)
  - £1M – £5M (Established business)
  - £5M+ (Large enterprise)
- `InlineHint`: "Why we ask this".
- `AutoSaveIndicator` ("Saved ✔") on selection.
- Selection persists to Zustand immediately.

## 7. `/onboarding/round1/profile-employees`
- Title: "How many people work in your business?"
- 4 `CardSelect` options:
  - 0 – 2 (Just you or a small team)
  - 3 – 10 (Small team)
  - 10 – 50 (Medium-sized team)
  - 50+ (Large team)
- `AutoSaveIndicator` on selection.

## 8. `/onboarding/round1/profile-cash-international`
- Title: "A few more questions".
- Two toggle cards (`Switch`):
  1. "Do you handle cash?" — Taking payments or deposits in cash.
  2. "Do you send or receive international payments?" — Trading with businesses abroad.
- `InlineHint` explaining the regulatory reason.
- `AutoSaveIndicator` on toggle change.

## 9. `/onboarding/round1/people`
- Title: "People in your business".
- Pulls directors and PSCs from mocked Companies House data.
- `PersonCard` for each person: name, role, status badge.

## 10. `/onboarding/round1/invite`
- Title: "Invite people to complete their verification".
- `PersonCard` with "Send invite" button per person.
- Button changes to "Invited" after click; status updates in Zustand.

## 11. `/onboarding/round1/kyc`
- Title: "Verify your identity".
- Description: "Quick verification to keep your account secure. Takes less than 2 minutes."
- 3 step cards:
  - Upload ID (`CreditCard` icon) — Passport or driving licence
  - Take a selfie (`Camera` icon) — Quick video to verify identity
  - Confirm address (`MapPin` icon) — Recent utility bill or bank statement
- Button: "Start verification".
- Mock `KYC_VERIFY_MS` delay → redirect to `/onboarding/round1/background-checks`.

## 12. `/onboarding/round1/background-checks` (loading carousel)
- Title: "Running security checks".
- Description: "This usually takes 2–3 minutes. We're making sure everything is secure."
- `LoadingCarousel` with 5 messages (durations from `BACKGROUND_CHECK_STEPS_MS`):
  1. "Verifying your identity..."
  2. "Checking Companies House data..."
  3. "Running AML and sanctions checks..."
  4. "Assessing business risk profile..."
  5. "Preparing your provisional account..."
- Each message: spinner while active, checkmark when complete.
- Total ~6s → auto-redirect to `/onboarding/round1/provisional`.

## 13. `/onboarding/round1/provisional`
- Title: "Your provisional account is ready!"
- Success hero with party-popper icon.
- Account details card:
  - Sort code (from Zustand)
  - Account number (from Zustand)
  - Copy button
- Alert listing provisional limits:
  - Receive up to £5,000/day
  - Send up to £1,000/transaction
  - View transactions and statements
- CTAs: "Continue" and "Go to dashboard" → `/dashboard/provisional`.

---

## Cross-cutting behaviour

- **State persistence:** every selection writes to Zustand immediately.
- **Checkpoint:** `useCheckpointSaver` writes the current route to localStorage on every navigation; expires after `CHECKPOINT_EXPIRY_DAYS`.
- **Auto-save indicator:** triggers on selection change, toggle change, input blur. Visible ~1s then fades.
- **Loading states:** `Loader2` spinner inside buttons; buttons disabled during async actions.
- **Mobile-first:** vertical stacking, full-width buttons, 44px+ touch targets, bottom-aligned primary CTA.
