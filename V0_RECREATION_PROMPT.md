# Metro Bank Business Onboarding - Complete V0 Recreation Prompt

## Overview
Build a complete, mobile-first business banking onboarding prototype for Metro Bank using Next.js 14 (App Router), TypeScript, Tailwind CSS, Zustand for state management, and Shadcn UI components.

---

## 🎨 Design System Requirements

### Color Palette
- **Primary Blue**: `#0046AD` (75% of buttons)
- **Accent Red**: `#DE1927` (25% of buttons - critical actions only)
- **Navy Text**: `#000D45`
- **Success Green**: Use standard success color
- **Warning/Alert**: Use standard warning color
- **Info**: Light blue for informational alerts

### Design Principles
- **Flat UI**: NO shadows anywhere (except on floating elements like modals)
- **Pill Buttons**: Border radius `9999px` (fully rounded)
- **Card Radius**: `12px`
- **Touch Targets**: Minimum `44px` height for all interactive elements
- **Mobile-First**: All layouts stack vertically, full-width buttons
- **Typography**: Clear hierarchy, responsive text sizing
- **Spacing**: Consistent padding and gaps using Tailwind scale

### Component Standards
Use Shadcn UI components exclusively:
- Button (primary, secondary, outline, ghost variants)
- Card (with CardHeader, CardTitle, CardContent)
- Input (with Labels)
- Switch
- Badge
- Alert (with AlertTitle, AlertDescription)
- Progress bar
- All components from Shadcn UI library

---

## 📦 Tech Stack

```json
{
  "framework": "Next.js 14 (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "state": "Zustand",
  "components": "Shadcn UI (Radix primitives)",
  "icons": "Lucide React"
}
```

---

## 🗂️ State Management - Zustand Store

Create `/lib/stores/onboarding-store.ts`:

```typescript
interface User {
  email: string
  authenticated: boolean
}

interface Business {
  id: string
  name: string
  address: string
  type: string
  directors: string[]
  pscs: string[]
  turnover?: string
  employees?: string
  handlesCash?: boolean
  international?: boolean
}

interface Person {
  id: string
  name: string
  role: 'director' | 'psc' | 'signatory'
  status: 'pending' | 'invited' | 'verified'
}

interface KYCStatus {
  primaryApplicantStatus: 'not_started' | 'in_progress' | 'completed'
}

interface ProvisionalAccount {
  sortCode: string
  accountNumber: string
  createdAt: string
}

interface Round2Progress {
  businessActivityDone: boolean
  mandateDone: boolean
  onlineBankingDone: boolean
  docsDone: boolean
}

interface OnboardingState {
  user: User
  business: Business | null
  people: Person[]
  kyc: KYCStatus
  provisionalAccount: ProvisionalAccount
  round2: Round2Progress

  // Actions
  setUser: (email: string) => void
  setBusiness: (business: Business) => void
  updateBusinessProfile: (updates: Partial<Business>) => void
  addPerson: (person: Person) => void
  updatePersonStatus: (id: string, status: Person['status']) => void
  updateKYCStatus: (status: KYCStatus['primaryApplicantStatus']) => void
  createProvisionalAccount: () => void
  markRound2Complete: (module: keyof Round2Progress) => void
}
```

Mock data includes 3 companies (Acme Digital Ltd, TechStart Solutions, Green Energy Co).

---

## 🛠️ Utility Functions

### 1. Passphrase Generator (`/lib/utils/passphrase.ts`)
```typescript
// 48-word wordlist (apple, banana, cherry, dragon, etc.)
// Functions:
// - generatePassphrase(): string[] - returns 3 random words
// - validatePassphrase(entered: string[], expected: string[]): boolean
// - formatPassphrase(words: string[]): string - formats as "word1 • word2 • word3"
```

### 2. Checkpoint System (`/hooks/use-checkpoint.ts`)
```typescript
// localStorage-based progress saving
// Functions:
// - saveCheckpoint(route: string, email?: string)
// - loadCheckpoint(): Checkpoint | null
// - clearCheckpoint()
// - useCheckpointSaver(email?: string) - auto-saves on navigation
// Checkpoints expire after 7 days
```

### 3. Module Ordering (`/lib/utils/module-ordering.ts`)
```typescript
// Dynamic Round 2 module ordering based on business profile
// computeModuleOrder(storeState): string[]
// If low risk (small turnover, few employees, no cash/international):
//   - Prioritize mandate first
//   - Defer or hide business activity
//   - Make documents optional
```

---

## 🎯 Complete Screen Flow

### **Round 1: Provisional Account (13 screens)**

#### 1. `/onboarding/round1/welcome`
- Hero with Metro Bank logo (M in circle)
- Title: "Open your Business Account"
- Benefits list with checkmarks:
  - Provisional account in under 10 minutes
  - Free business banking for 18 months
  - Instant payments with no hidden fees
  - Multi-currency accounts included
  - Dedicated support team
- TimeEstimate component showing "~10 minutes remaining"
- Primary CTA: "Start Application" → /login
- Resume banner if checkpoint exists

#### 2. `/onboarding/round1/login` (Magic Link - NO PASSWORD)
- Title: "Start or continue your application"
- Email input only (no password field)
- Optional phone number input for SMS updates
- Info alert: "Secure & Simple: No password to remember. The link expires in 7 days and works on any device."
- Button: "Send me the link"
- After 1.5s loading: Success screen showing "Check your email"
- Auto-redirects to passphrase after 2s

#### 3. `/onboarding/round1/passphrase` (NEW)
- Title: "Verify your identity"
- Display box showing 3 generated words in large text with dots between them
- Example: "mountain • tiger • palace"
- 3 input fields for entering each word
- Validates exact match (case-insensitive)
- Error alert if words don't match
- Info text: "This extra step ensures only you can access your application"

#### 4. `/onboarding/round1/lookup-business`
- Title: "Find your business"
- Search input (min 2 chars to search)
- Filters mock company list by name/address
- Shows company cards with name, address, company type
- Click card → selects company and continues

#### 5. `/onboarding/round1/confirm-business`
- Title: "Confirm your business details"
- Shows: Company name, address, type
- Lists directors and PSCs (Persons with Significant Control)
- Primary button: "This is correct" → continue

#### 6. `/onboarding/round1/profile-turnover`
- Title: "What is your annual turnover?"
- 4 CardSelect options:
  - £0 – £250K (Early stage or small business)
  - £250K – £1M (Growing business)
  - £1M – £5M (Established business)
  - £5M+ (Large enterprise)
- InlineHint: "Why we ask this" (expandable)
- AutoSaveIndicator shows "Saved ✔" when selected
- Saves to Zustand immediately on selection

#### 7. `/onboarding/round1/profile-employees`
- Title: "How many people work in your business?"
- 4 CardSelect options:
  - 0 – 2 (Just you or a small team)
  - 3 – 10 (Small team)
  - 10 – 50 (Medium-sized team)
  - 50+ (Large team)
- AutoSaveIndicator on selection

#### 8. `/onboarding/round1/profile-cash-international`
- Title: "A few more questions"
- Two toggle cards with Switch components:
  1. "Do you handle cash?" (Taking payments or deposits in cash)
  2. "Do you send or receive international payments?" (Trading with businesses abroad)
- InlineHint explaining regulatory requirements
- AutoSaveIndicator on any toggle change

#### 9. `/onboarding/round1/people`
- Title: "People in your business"
- Shows directors and PSCs from Companies House
- PersonCard components showing name, role, status badges

#### 10. `/onboarding/round1/invite`
- Title: "Invite people to complete their verification"
- PersonCard for each person with "Send invite" button
- Button changes to "Invited" after click
- Updates person status in Zustand

#### 11. `/onboarding/round1/kyc`
- Title: "Verify your identity"
- Description: "Quick verification to keep your account secure. Takes less than 2 minutes."
- 3 steps shown as cards:
  - Upload ID (CreditCard icon) - Passport or driving licence
  - Take a selfie (Camera icon) - Quick video to verify identity
  - Confirm address (MapPin icon) - Recent utility bill or bank statement
- Button: "Start verification"
- Mock 1.5s delay → redirects to background-checks

#### 12. `/onboarding/round1/background-checks` (NEW - Loading Carousel)
- Title: "Running security checks"
- Description: "This usually takes 2–3 minutes. We're making sure everything is secure."
- LoadingCarousel component with 5 animated messages:
  1. "Verifying your identity..." (1.2s)
  2. "Checking Companies House data..." (1.0s)
  3. "Running AML and sanctions checks..." (1.3s)
  4. "Assessing business risk profile..." (1.1s)
  5. "Preparing your provisional account..." (1.4s)
- Each message shows with spinner while active, checkmark when complete
- Total ~6 seconds → auto-redirects to provisional

#### 13. `/onboarding/round1/provisional`
- Title: "Your provisional account is ready!"
- Success hero with party popper icon
- Account details card showing:
  - Sort code (from Zustand)
  - Account number (from Zustand)
  - Copy button
- Alert showing provisional limits:
  - Receive up to £5,000/day
  - Send up to £1,000/transaction
  - View transactions and statements
- Two CTAs:
  - "Continue" → /dashboard/provisional
  - "Go to dashboard" → /dashboard/provisional

---

### **Round 1.5: Provisional Dashboard (NEW)**

#### `/dashboard/provisional`
- Custom layout (not OnboardingLayout)
- Header: "Welcome to Metro Bank" with subtitle "Your provisional account is active"
- **Account Summary Card**:
  - Business name
  - "In progress" badge with warning color
  - Balance: £0.00
  - Sort code and account number in grid
  - Microtext: "Some features are locked until setup is completed"
- **Continue Setup CTA**: "Complete your setup" → /round2/secure-account
- **Product Preview Cards** (6 cards):
  1. Business lending (locked) → /round2/lending-preassessment
  2. Toolkit+ (locked, no route)
  3. International transfers (locked, no route)
  4. Approvals & permissions (locked) → /round2/mandate
  5. Business plans (locked) → /round2/subscription
  6. Debit cards (locked, no route)
- Each card shows: icon, title, description, lock icon if locked
- Clickable cards navigate to routes
- SupportBubble component included

---

### **Round 2: Full Verification (9 screens)**

#### 1. `/onboarding/round2/secure-account` (NEW)
- Title: "Secure your account"
- Description: "Create a passcode to protect your business banking"
- Two passcode inputs (6 digits each):
  - "Create 6-digit passcode"
  - "Confirm passcode"
- Validation: must be exactly 6 digits, must match
- **Biometric card** (toggle):
  - Title: "Enable Face ID / Touch ID"
  - Description: "Sign in quickly and securely using biometrics"
  - Checkmark appears when enabled
- Info alert: "Your passcode is stored securely on your device"
- Primary button: "Continue" → /round2/dashboard
- Secondary button: "Skip for now" → /dashboard (main)

#### 2. `/onboarding/round2/dashboard`
- Title: "Finish setting up your business banking"
- ProgressSteps component showing horizontal step indicators
- Alert: "Your provisional account is active" with info about limits
- ChecklistItem for each module:
  - Tell us about your business activity
  - Set up approvals and mandates
  - Choose your online banking setup
  - Upload requested documents
- Each item clickable, shows status (done/todo)
- "Complete setup" button appears when all done

#### 3. `/onboarding/round2/business-activity`
- Multi-step wizard (3 steps)
- Step 1: Countries (Select countries, Badge chips)
- Step 2: Payment methods (Select methods, Badge chips)
- Step 3: Cash percentage (Slider 0-100%)
- Next/Back buttons, marks complete when done

#### 4. `/onboarding/round2/mandate`
- Multi-step wizard (2 steps)
- Step 1: Mandate type (Single/Dual/Any two)
- Step 2: People permissions (Switch for each person)
- Shows approval rules explanation
- Marks complete when done

#### 5. `/onboarding/round2/online-banking`
- Multi-step wizard (2 steps)
- Step 1: Plan selection (Essential/Plus/Premium cards)
- Step 2: Daily limit (Preset buttons + custom input)
- Marks complete when done

#### 6. `/onboarding/round2/documents`
- Title: "Upload requested documents"
- UploadCard components for each document:
  - Business address proof (required)
  - Trading proof (required)
  - Shareholder agreement (optional)
- Each shows upload button, filename when "uploaded"
- Marks complete when required docs uploaded

#### 7. `/onboarding/round2/complete`
- Success screen: "Your account is ready!"
- Celebration UI with success icon
- "What's unlocked" list:
  - Full payment limits
  - International transfers
  - Multi-currency accounts
  - Debit cards
  - Lending access
- CTA: "Go to your dashboard" → /dashboard

#### 8. `/onboarding/round2/subscription` (PLACEHOLDER)
- Title: "Business plans"
- Large card with Package icon
- "Coming soon" message
- Back button

#### 9. `/onboarding/round2/lending-preassessment` (PLACEHOLDER)
- Title: "Business lending"
- Large card with TrendingUp icon
- "Coming soon" message
- Explanation: "Available after full verification"
- Back button

---

## 🧩 Reusable Components

### 1. OnboardingLayout (`/components/onboarding/onboarding-layout.tsx`)
```typescript
interface OnboardingLayoutProps {
  children: ReactNode
  progress?: number        // 0-100 for progress bar
  showBack?: boolean      // Show back button
  showProgress?: boolean  // Show progress bar
}
```
- Has back button (top-left)
- Progress bar with percentage
- Max-width 2xl container
- Auto-saves checkpoint via useCheckpointSaver hook
- Includes SupportBubble component

### 2. FormSection (`/components/onboarding/form-section.tsx`)
```typescript
interface FormSectionProps {
  title: string
  description: string
  children: ReactNode
}
```
- Responsive typography (text-h2-responsive)
- Consistent title/description layout

### 3. CardSelect (`/components/onboarding/card-select.tsx`)
```typescript
interface CardSelectProps {
  label: string
  description: string
  selected: boolean
  onClick: () => void
  icon?: ReactNode
}
```
- Border changes when selected (border-primary)
- Shows checkmark when selected
- Icon on left, content in middle

### 4. ChecklistItem (`/components/onboarding/checklist-item.tsx`)
```typescript
interface ChecklistItemProps {
  label: string
  description: string
  status: 'todo' | 'done'
  onClick: () => void
}
```
- Shows status badge (grey for todo, green for done)
- Clickable card

### 5. PersonCard (`/components/onboarding/person-card.tsx`)
```typescript
interface PersonCardProps {
  name: string
  role: string
  status: 'pending' | 'invited' | 'verified'
}
```
- Avatar circle with initials
- Role badge
- Status indicator

### 6. UploadCard (`/components/onboarding/upload-card.tsx`)
```typescript
interface UploadCardProps {
  title: string
  required?: boolean
  filename?: string
  onUpload: () => void
}
```
- Upload button
- Shows filename when uploaded
- Optional "Required" badge

### 7. AutoSaveIndicator (`/components/onboarding/auto-save-indicator.tsx`)
```typescript
interface AutoSaveIndicatorProps {
  visible: boolean
  onFadeComplete?: () => void
  position?: 'top' | 'inline'
}
```
- Shows "Saved ✔" with success color
- Fades in/out automatically (1s visible)
- Green checkmark icon

### 8. InlineHint (`/components/onboarding/inline-hint.tsx`)
```typescript
interface InlineHintProps {
  children: ReactNode
}
```
- "Why we ask this" button with Info icon
- Expandable/collapsible content
- Info-colored background when expanded

### 9. TimeEstimate (`/components/onboarding/time-estimate.tsx`)
```typescript
interface TimeEstimateProps {
  minutes: number
}
```
- Shows Clock icon + formatted time text
- "~X minutes remaining" or "~X seconds left"

### 10. ProgressSteps (`/components/onboarding/progress-steps.tsx`)
```typescript
interface ProgressStepsProps {
  steps: Array<{
    label: string
    completed: boolean
    current: boolean
  }>
}
```
- Horizontal scrollable steps
- Checkmark for completed, circle for pending
- Connecting lines between steps
- Color-coded (success for done, primary for current)

### 11. LoadingCarousel (`/components/onboarding/loading-carousel.tsx`)
```typescript
interface LoadingCarouselProps {
  messages: Array<{
    text: string
    duration: number  // milliseconds
  }>
  onComplete: () => void
}
```
- Shows messages sequentially with auto-advance
- Spinner for current message
- Checkmark for completed messages
- Greyed out for pending messages

### 12. SupportBubble (`/components/onboarding/support-bubble.tsx`)
- Fixed position bottom-right
- Floating circular button with MessageCircle icon
- Clicks opens card modal with 4 options:
  - Chat with us (MessageCircle icon)
  - Call us (Phone icon)
  - Email us (Mail icon)
  - FAQs (HelpCircle icon)
- Each option has title, description, icon in circle
- Mobile backdrop overlay when open

---

## 🎨 Design System Custom Classes

Add to `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#0046AD',      // Blue
      accent: '#DE1927',       // Red
      foreground: '#000D45',   // Navy
      'info-light': '#E3F2FD',
      'info-dark': '#1976D2',
      'info': '#2196F3'
    },
    height: {
      'touch': '48px',       // Standard touch target
      'touch-lg': '56px'     // Large touch target
    },
    fontSize: {
      'h1': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
      'h2': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
      'h3': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
      'display': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }]
    }
  }
}
```

---

## 🔧 Key Implementation Details

### Navigation Flow
1. Welcome → Login → Passphrase → Business Lookup → Confirm → Turnover → Employees → Cash/Intl → People → Invite → KYC → Background Checks → Provisional → **Provisional Dashboard** → Secure Account → Round 2 Dashboard → Modules → Complete

### State Persistence
- All form selections save immediately to Zustand
- Checkpoint saves route to localStorage on every navigation
- Welcome page shows "Continue where you left off" banner if checkpoint exists
- 7-day expiration on checkpoints

### Auto-Save Pattern
- Use AutoSaveIndicator component
- Trigger on: selection change, toggle change, input blur
- Shows for 1 second then fades
- Green checkmark with "Saved" text

### Loading States
- All async actions show Loader2 spinner in buttons
- Background checks uses LoadingCarousel with specific timing
- Disabled state on buttons during loading

### Validation
- Passphrase: exact 3-word match (case-insensitive)
- Passcode: exactly 6 digits, must match confirmation
- Email: must contain @ and be > 3 chars
- All validations show error alerts

### Mobile Optimization
- All layouts: `flex flex-col` (vertical stacking)
- All buttons: `w-full` (full width)
- Touch targets: minimum `h-touch` (48px)
- No hover states (use active states)
- Single column layouts throughout
- Bottom-aligned primary actions

### Mock Timing
- Magic link send: 1.5s
- Auto-redirect after magic link: 2s
- Passphrase verification: 0.8s
- KYC verification: 1.5s
- Background checks: ~6s total (5 messages with varying durations)

---

## 📱 Additional Features

### Support Bubble
- Appears on all onboarding screens and provisional dashboard
- Fixed position: `bottom-6 right-6` (md: `bottom-8 right-8`)
- Z-index: 50
- Circular button: 56x56px with primary background
- Modal: max-width sm, bottom-positioned on mobile

### Checkpoint Resume
- Welcome page checks localStorage on mount
- Shows banner with "Continue" and "Start fresh" buttons
- "Continue" navigates to saved route
- "Start fresh" clears checkpoint and hides banner

### Dynamic Module Ordering
- If business is low-risk profile:
  - Turnover: £0-250K
  - Employees: 0-2
  - Cash: false
  - International: false
- Then reorder Round 2 dashboard:
  - Mandate first
  - Hide/defer business activity
  - Make documents optional
- Function: `computeModuleOrder(state)`

---

## 🎯 Quality Checklist

### Design System Compliance
- [ ] All buttons use DS variants (no custom button styles)
- [ ] Pill-shaped buttons (rounded-full)
- [ ] Flat UI (no shadows except modals)
- [ ] Blue primary (75%), Red accent (25%)
- [ ] 12px card radius
- [ ] All Shadcn UI components used correctly

### Mobile-First
- [ ] All layouts stack vertically
- [ ] All buttons full-width
- [ ] Touch targets 44px+ minimum
- [ ] No hover-only interactions
- [ ] Single-column throughout
- [ ] Bottom-aligned CTAs

### State Management
- [ ] Zustand store with all types
- [ ] Immediate saves on selections
- [ ] Checkpoint saves on navigation
- [ ] Mock data includes 3 companies
- [ ] All actions update store correctly

### User Experience
- [ ] Auto-save indicators on key actions
- [ ] Loading states on all async operations
- [ ] Error states with clear messaging
- [ ] Progress indicators throughout
- [ ] Time estimates where helpful
- [ ] Expandable hints on complex questions
- [ ] Support bubble on all screens

### Navigation
- [ ] All routes work correctly
- [ ] Back buttons functional
- [ ] Auto-redirects after delays
- [ ] Checkpoint resume works
- [ ] Skip options lead to dashboard

---

## 🚀 Build Order

1. **Setup**: Next.js 14, TypeScript, Tailwind, Shadcn UI
2. **Design System**: Colors, spacing, button styles in tailwind.config
3. **Zustand Store**: Complete state management with mock data
4. **Utils**: Passphrase generator, checkpoint system
5. **Base Components**: OnboardingLayout, FormSection, all micro-components
6. **Round 1 Screens**: All 13 screens in order
7. **Provisional Dashboard**: New Round 1.5 screen
8. **Round 2 Screens**: All 9 screens including placeholders
9. **Navigation Page**: Homepage with all routes listed
10. **Polish**: Auto-save, hints, time estimates, support bubble

---

## 📝 Notes

- Everything is MOCKED - no real API calls
- All delays use `setTimeout`
- All uploads just store filenames in state
- All verifications are instant (with mock delays)
- Companies House data is hardcoded
- Magic links don't send real emails
- Passcodes don't do real encryption
- Biometric toggles just set boolean flags

This prototype demonstrates UX patterns and flows for modern digital banking onboarding, following industry standards from Monzo, Tide, Revolut, N26, Starling, and Wise.

---

## 🎨 Visual Reference

**Color Usage Examples:**
- Primary buttons: Blue background (`bg-primary`)
- Critical actions: Red background (`bg-accent`) - used sparingly (e.g., "Delete", "Cancel")
- Success states: Green (`text-success`, `bg-success`)
- Warnings: Amber (`text-warning`, `bg-warning`)
- Info alerts: Light blue background (`bg-info-light`)
- Disabled states: Muted (`opacity-60`)
- Text hierarchy: Navy for headings, gray for descriptions

**Layout Patterns:**
- Cards: `border-2` with `p-5` content padding
- Spacing: Use `space-y-3` for tight groups, `space-y-6` for sections
- Buttons: Always `size="lg"` with `h-touch-lg` class
- Icons: Typically `h-5 w-5` or `h-6 w-6` in circles
- Form inputs: `h-touch` for consistent touch targets

**Animation Standards:**
- Auto-save: Fade in/out over 300ms
- Loading carousel: 1-1.5s per message
- Modals: Slide up from bottom on mobile
- Transitions: Use `transition-all duration-200`

This prompt contains everything needed to recreate the entire Metro Bank onboarding prototype in V0 or any other development environment.
