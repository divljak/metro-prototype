# Provisional Dashboard Preview - Magicpatch Prompt

Create a mobile-first provisional banking dashboard screen for Metro Bank Business Banking.

---

## Design System

### Colors
- Primary Blue: `#0046AD`
- Navy Text: `#000D45`
- Warning/In Progress: `#FF9800`
- Background: White/Light gray
- Muted text: `#6B7280`

### Typography
- Headings: Navy blue, bold, clear hierarchy
- Body text: Dark gray for readability
- Account numbers: Monospace font

### Design Rules
- **Flat UI**: No shadows (except floating support button)
- **Card Radius**: 12px
- **Button Radius**: Fully rounded (pill shape)
- **Spacing**: Consistent 16-24px padding
- **Touch Targets**: 48px minimum height
- **Mobile-First**: Single column, full-width elements

---

## Layout Structure

### Header Section
- **Padding**: 24px top/bottom, 16px left/right
- **Logo**: "M" in blue circle (64px diameter) - optional, can skip
- **Title**: "Welcome to Metro Bank" (H1, bold, navy)
- **Subtitle**: "Your provisional account is active" (muted gray)

### Main Content (max-width: 672px, centered)

---

## 1. Account Summary Card

**Visual Design:**
- White card with 2px border
- 16px border radius
- 20px padding
- Clear sections with dividers

**Content:**

**Header Row:**
- Left side:
  - Business name: "Your Business Ltd" (16px, semibold, navy)
  - Account type: "Business Current Account" (14px, muted)
- Right side:
  - Badge: "In progress" with warning/amber background
  - Small alert icon next to badge text

**Balance Section:**
- Large text: "£0.00" (36px, bold, navy)
- Label below: "Current balance" (12px, muted)

**Account Details (2-column grid):**
- Column 1:
  - Label: "Sort code" (12px, muted)
  - Value: "04-00-04" (16px, monospace, semibold)
- Column 2:
  - Label: "Account number" (12px, muted)
  - Value: "12345678" (16px, monospace, semibold)

**Footer note:**
- Thin top border
- Text: "Some features are locked until setup is completed." (12px, muted)

---

## 2. Continue Setup Button

**Design:**
- Full-width blue button
- Height: 56px
- Fully rounded corners (pill shape)
- White text (16px, medium)
- Text: "Complete your setup"
- Right arrow icon (20px)
- 24px spacing below

---

## 3. Feature Discovery Section

**Section Header:**
- Title: "Discover features" (20px, semibold, navy)
- Description: "Complete setup to unlock all banking features" (14px, muted)
- 16px spacing below

**6 Product Cards (stacked vertically, 12px gap):**

Each card structure:
- White background with 2px border
- 12px border radius
- 20px padding
- Slightly muted/disabled appearance (60% opacity)
- Horizontal layout: icon | content | lock

**Card Layout:**
- Left: Circular icon container (48px)
  - Light gray background
  - Gray icon centered (24px)
- Middle: Text content
  - Title (16px, semibold, navy)
  - Description (14px, gray)
- Right: Small lock icon (16px, gray)

**6 Products:**

1. **Business lending**
   - Icon: TrendingUp/chart icon
   - Description: "Provide a few details to see available credit lines."

2. **Toolkit+**
   - Icon: FileText/document icon
   - Description: "Unlock invoicing, expenses, and accounting integrations."

3. **International transfers**
   - Icon: Globe icon
   - Description: "Available after completing setup."

4. **Approvals & permissions**
   - Icon: Users/people icon
   - Description: "Decide who can approve payments in your business."

5. **Business plans**
   - Icon: Package/box icon
   - Description: "Pick the plan that fits your needs."

6. **Debit cards**
   - Icon: CreditCard icon
   - Description: "Available once verification is complete."

---

## 4. Support Bubble (Floating)

**Position:**
- Fixed to bottom-right corner
- 24px from bottom, 24px from right
- Z-index: 50 (floats above content)

**Design:**
- Circular button: 56x56px
- Blue background (`#0046AD`)
- White message/chat icon (24px)
- Subtle shadow for elevation

---

## Spacing & Rhythm

- Section spacing: 24px between major sections
- Card stack spacing: 12px between product cards
- Internal padding: 20px inside cards
- Edge margins: 16px left/right on mobile

---

## Interactions

**Product Cards:**
- Some cards are clickable (slightly darker border on hover)
- All show lock icon indicating locked state
- No visual difference between clickable/non-clickable in this static view

**Button:**
- Clear call-to-action styling
- Prominent positioning above feature list

---

## Mobile Layout Priority

1. Header (welcome message)
2. Account summary card (most important)
3. Continue setup button (primary CTA)
4. Feature discovery section (engagement)
5. Support bubble (help access)

**Vertical Flow:**
Top → Bottom, single column, no side-by-side elements

---

## Visual Hierarchy

**Primary Focus:**
1. Account balance (£0.00) - largest text
2. "Complete your setup" button - primary blue
3. Account numbers - monospace, clear

**Secondary Elements:**
- Feature cards - muted, indicates future availability
- Status badge - warning color, but not alarming
- Descriptive text - informative, not prominent

---

## Copy & Messaging Tone

- Welcoming: "Welcome to Metro Bank"
- Informative: "Your provisional account is active"
- Encouraging: "Complete your setup"
- Clear expectations: "Available after completing setup"
- No jargon: Simple, direct language

---

## Accessibility

- Touch targets: 48px minimum (button is 56px)
- Clear contrast ratios for all text
- Obvious interactive elements (blue button)
- Lock icons clearly indicate disabled state
- No hover-only interactions

---

## Overall Aesthetic

**Banking Trust Signals:**
- Clean, professional layout
- Clear account information display
- Organized feature presentation
- Secure feeling (lock icons, status badge)

**Modern Digital Bank Vibe:**
- Flat design (no skeuomorphism)
- Ample white space
- Clear information hierarchy
- Mobile-optimized layout
- Friendly, approachable copy

**Engagement Elements:**
- Feature preview cards (discovery)
- Clear next step (complete setup)
- Support access (floating button)
- Progress indication (in progress badge)

---

## Implementation Notes

**Card Component Pattern:**
All cards use consistent structure:
```
┌─────────────────────────────────┐
│ [Icon]  Title              [→]  │
│         Description             │
└─────────────────────────────────┘
```

**Color Application:**
- Blue: Primary actions, branding
- Navy: Headings, important text
- Gray: Supporting text, disabled states
- Amber: Warning/in-progress status
- White: Card backgrounds, button text

**Spacing System:**
- 4px: Tight (text line height)
- 8px: Close (related items)
- 12px: Compact (card stacks)
- 16px: Standard (internal padding)
- 20px: Medium (card padding)
- 24px: Spacious (section breaks)

---

## Screen Dimensions

**Mobile (Primary):**
- Width: 375px - 428px
- Content max-width: 672px
- Full viewport height
- Scrollable content

**Padding:**
- Outer: 16px left/right
- Cards: 20px internal
- Sections: 24px vertical gaps

---

## Key User Actions

**Primary:**
- Tap "Complete your setup" → Navigate to next onboarding step

**Secondary:**
- Tap support bubble → Open help modal
- View account details → Copy information
- Explore locked features → Understand what's coming

**Visual Cues:**
- Blue button = primary action (go)
- Lock icons = not yet available (wait)
- Badge = current status (in progress)

---

## Brand Expression

**Metro Bank Values:**
- Trust: Clean design, clear information
- Simplicity: No clutter, easy to scan
- Progress: Shows what's active, what's next
- Support: Always accessible (floating button)
- Transparency: Honest about limitations (locked features)

---

## Final Design Requirements

✓ Mobile-first layout (single column)
✓ Clear visual hierarchy (balance → CTA → features)
✓ Consistent spacing (16/20/24px system)
✓ Professional banking aesthetic (navy + blue)
✓ Touch-friendly (56px button, 48px+ targets)
✓ Accessible (contrast, clear states)
✓ Flat UI (no unnecessary shadows)
✓ Monospace for account numbers
✓ Lock icons on disabled features
✓ Floating support button (bottom-right)

---

This dashboard serves as a "bridge" between account creation and full verification, giving users immediate value while encouraging completion of the onboarding process. The locked feature cards create anticipation and motivation to finish setup.
