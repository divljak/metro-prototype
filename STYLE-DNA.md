# Metro Banking Style DNA

The visual language and design principles that define Metro Banking's interface.

---

## Core Philosophy

**Trust through simplicity.** Metro Banking uses a flat, shadow-free interface that prioritizes clarity, directness, and visual honesty. Every design decision reinforces trustworthiness and ease of use.

---

## Color System

### Brand Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Metro Blue** | `#0046AD` | `0 70 173` | **PRIMARY (75%)** - Login, Continue, Save, Submit, links, focus states |
| **Metro Red** | `#DE1927` | `222 25 39` | **ACCENT (25%)** - Critical actions only: Payments, Transfers, Apply Now |
| **Metro Navy** | `#000D45` | `0 13 69` | All text content (replaces black) |
| **Off White** | `#FEF9F9` | `254 249 249` | Page canvas background |

### Functional Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **White** | `#FFFFFF` | `255 255 255` | Card surfaces, secondary CTAs |
| **Destructive** | `#C01622` | `192 22 34` | Errors, critical actions (separate from brand red) |
| **Success** | `#16A34A` | `22 163 74` | Payment confirmed, success states |
| **Success Light** | `#DCFCE7` | `220 252 231` | Success message backgrounds |
| **Success Dark** | `#15803D` | `21 128 61` | Success text on light backgrounds |
| **Warning** | `#EA580C` | `234 88 12` | Low balance alerts, caution states |
| **Warning Light** | `#FEF3C7` | `254 243 199` | Warning message backgrounds |
| **Warning Dark** | `#92400E` | `146 64 14` | Warning text on light backgrounds |
| **Info** | `#0046AD` | `0 70 173` | Informational messages (reuses brand blue) |
| **Info Light** | `#DBEAFE` | `219 234 254` | Info message backgrounds |
| **Info Dark** | `#1E3A8A` | `30 58 138` | Info text on light backgrounds |
| **Border** | `#E2E8F0` | `226 232 240` | Card borders, dividers |
| **Muted** | `#F8FAFC` | `248 250 252` | Subtle backgrounds |
| **Muted Text** | `#64748B` | `100 116 139` | Secondary text, captions |

### Color Rules

1. **Blue-primary strategy** — Use Blue for 75% of buttons (Login, Continue, Save), Red for 25% critical actions only (Payments, Transfers)
2. **No pure black** — Always use Navy (`#000D45`) for text
3. **Destructive ≠ Brand** — Error states use `#C01622`, not brand red
4. **Success/Warning/Info** — Use semantic colors consistently for feedback states
5. **Light variants for backgrounds** — Use `-light` colors for message/alert backgrounds
6. **Dark variants for text** — Use `-dark` colors for text on light semantic backgrounds
7. **Alpha transparency** — All colors support opacity modifiers (e.g., `bg-primary/50`, `bg-success/20`)
8. **Blue for interaction** — All clickable elements, links, and focus states use Metro Blue

---

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Text Hierarchy

| Element | Size | Weight | Color | Usage |
|---------|------|--------|-------|-------|
| **H1** | 36px (2.25rem) | Bold (700) | Navy | Page titles |
| **H2** | 30px (1.875rem) | Semibold (600) | Navy | Section headers |
| **H3** | 24px (1.5rem) | Semibold (600) | Navy | Subsections |
| **Body** | 16px (1rem) | Regular (400) | Navy | Primary content |
| **Small** | 14px (0.875rem) | Regular (400) | Navy or Muted | Secondary text |
| **Caption** | 12px (0.75rem) | Regular (400) | Muted | Hints, labels |
| **Link** | Inherit | Inherit | **Blue** | Interactive text |

### Typography Rules

1. **All body text is Navy** — Never use gray or black for primary text
2. **Links are always Blue** — Use Metro Blue (`#0046AD`) with underline on hover
3. **Muted text for hierarchy** — Use muted color for secondary information only
4. **Bold for emphasis** — Use semibold (600) or bold (700) weights for visual hierarchy

---

## Buttons

### Button Strategy
**Blue-primary approach:** Use Blue for 75% of buttons, Red for 25% critical actions only.

### Primary CTA (Default) - Blue (75%)
```tsx
<Button>Login</Button>
<Button>Continue</Button>
<Button>Save Changes</Button>
```
- **Background:** Metro Blue (`#0046AD`)
- **Text:** White
- **Shape:** Full-rounded pill (`rounded-full`)
- **Border:** None
- **Hover:** 90% opacity blue
- **No shadow**
- **Use for:** Login, Continue, Save, Submit, View Details

### Accent CTA (Red) - Critical Actions (25%)
```tsx
<Button variant="accent">Confirm Payment</Button>
<Button variant="accent">Transfer Funds</Button>
```
- **Background:** Metro Red (`#DE1927`)
- **Text:** White
- **Shape:** Full-rounded pill
- **Border:** None
- **Hover:** 90% opacity red
- **No shadow**
- **Use for:** Payments, Transfers, Apply Now (critical actions only)

### Secondary CTA
```tsx
<Button variant="secondary">Cancel</Button>
```
- **Background:** White
- **Text:** Metro Blue
- **Shape:** Full-rounded pill
- **Border:** 2px solid Metro Blue
- **Hover:** Light gray background (80% opacity)
- **No shadow**

### Other Variants

| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| **Outline** | Transparent | Navy | 2px border | Tertiary actions |
| **Ghost** | Transparent | Navy | None | Subtle actions |
| **Link** | Transparent | Blue | None | Text-style actions |
| **Destructive** | Destructive Red | White | None | Delete, cancel |

### Button Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| **Small** | 36px | 16px × 8px | 12px |
| **Default** | 44px | 24px × 12px | 14px |
| **Large** | 56px | 32px × 16px | 16px |

### Button Rules

1. **Always pill-shaped** — Use `rounded-full` for all buttons
2. **Never use shadows** — Flat design only
3. **Blue for 75% of actions** — Use blue buttons for most actions (Login, Continue, Save)
4. **Red for 25% critical actions** — Only use red for critical actions (Payments, Transfers)
5. **Focus rings are Blue** — 2px blue ring, no offset

---

## Cards & Containers

### Card Structure
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Card Styling
- **Background:** White (`#FFFFFF`)
- **Border:** 1px solid `#E2E8F0` (light gray)
- **Border Radius:** 12px (soft corners)
- **Padding:** 24px
- **No shadow**
- **Text:** Navy

### Card Rules

1. **Flat surfaces only** — No shadows, elevations, or depth effects
2. **White background** — Cards are always white on off-white canvas
3. **Thin borders** — Single-pixel light gray borders define card edges
4. **Consistent spacing** — 24px padding inside cards

---

## Forms

### Input Fields
- **Height:** 44px
- **Border:** 1px solid `#E2E8F0`
- **Border Radius:** 8px (soft)
- **Background:** White
- **Text:** Navy
- **Placeholder:** Muted text
- **Focus:** 2px Blue ring, no offset
- **No shadow**

### Select Dropdowns
- Same styling as input fields
- Dropdown menu: White background, subtle border
- Hover states: Light gray background

### Checkboxes & Radio Buttons
- **Unchecked:** Light border
- **Checked:** Metro Red background, white checkmark
- **Focus:** Blue ring

### Labels
- **Font Size:** 14px
- **Weight:** Medium (500)
- **Color:** Navy
- **Spacing:** 8px below label

---

## Iconography

### Icon Style
- **Type:** Line icons (outlined, not filled)
- **Weight:** 2px stroke
- **Size:** 20px × 20px (default), 24px × 24px (large)
- **Color:** Inherits from text color (usually Navy)

### Icon Backgrounds (Brand Moments)
- **Background:** Metro Red circle
- **Icon:** White line icon
- **Use cases:** Feature highlights, success states, promotional content

### Icon Rules

1. **Outlined style** — Use line icons, not filled/solid
2. **2px stroke weight** — Consistent line thickness
3. **Red circles for emphasis** — Use red background circles for key features
4. **Inherit text color** — Icons follow text color by default

---

## Spacing & Layout

### Spacing Scale
```css
/* Tailwind spacing scale */
0.5 = 2px   /* Micro spacing */
1   = 4px   /* Tight spacing */
2   = 8px   /* Small spacing */
3   = 12px  /* Default spacing */
4   = 16px  /* Medium spacing */
6   = 24px  /* Large spacing */
8   = 32px  /* XL spacing */
12  = 48px  /* Section spacing */
16  = 64px  /* Page spacing */
```

### Layout Rules

1. **Max width:** 1400px for content containers
2. **Grid:** 12-column responsive grid
3. **Gutter:** 24px between columns
4. **Breakpoints:**
   - Mobile: < 768px
   - Tablet: 768px - 1024px
   - Desktop: > 1024px

---

## Shadows & Elevation

### The Golden Rule
**NO SHADOWS. EVER.**

Metro Banking uses a completely flat design language. Visual hierarchy is created through:
- Color contrast
- Border weight
- Spacing
- Typography scale

### What to Use Instead

| Traditional Approach | Metro Banking Approach |
|---------------------|------------------------|
| Drop shadow | Border + spacing |
| Elevation | Background color contrast |
| Hover shadow | Background color change |
| Focus shadow | 2px blue ring |

---

## Interaction States

### Hover States
- **Buttons:** Reduce opacity to 90%
- **Cards:** Light gray background (`#F8FAFC`)
- **Links:** Underline appears
- **No shadows**

### Focus States
- **All interactive elements:** 2px solid Blue ring
- **Ring offset:** 0 (flush with element)
- **No glow or shadow**

### Active States
- **Buttons:** Reduce opacity to 80%
- **No shadow or transform effects**

### Disabled States
- **Opacity:** 50%
- **Cursor:** `not-allowed`
- **No interaction**

---

## Accessibility

### Color Contrast
- Navy (`#000D45`) on White: **WCAG AAA** ✓
- Metro Red (`#DE1927`) on White: **WCAG AA** ✓
- Metro Blue (`#0046AD`) on White: **WCAG AA** ✓
- Muted text meets **WCAG AA** for large text

### Focus Indicators
- All interactive elements have visible 2px Blue focus ring
- Focus ring uses `outline-none` and `ring-2 ring-ring` for consistency
- No reliance on hover-only states

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels associated with inputs
- Button vs. link semantics respected

---

## Motion & Animation

### Philosophy
**Subtle and functional.** Animations should enhance usability, not distract.

### Animation Guidelines
- **Duration:** 200ms - 300ms
- **Easing:** `ease-out` for entrances, `ease-in` for exits
- **Use sparingly:** Only for state changes, not decoration

### Allowed Animations
1. **Accordion expand/collapse** — Smooth height transitions
2. **Tab switching** — Fade transition (200ms)
3. **Button hover** — Opacity change (150ms)
4. **Modal/Dialog** — Fade + scale (250ms)

### Prohibited Animations
- Parallax scrolling
- Sliding panels (use instant sheet instead)
- Bouncing or elastic effects
- Loading spinners (use skeleton loaders)

---

## Component Patterns

### Tables
- **Header:** Navy text, semibold
- **Rows:** Alternating row colors optional (very subtle gray)
- **Borders:** Thin horizontal borders between rows
- **Hover:** Light gray background on row hover

### Badges
- **Background:** Muted gray or semantic color
- **Text:** Navy or white (depending on background)
- **Border Radius:** Full pill (`rounded-full`)
- **Padding:** 4px × 12px

### Alerts
- **Info:** Blue border, light blue background
- **Warning:** Orange border, light orange background
- **Error:** Destructive red border, light red background
- **Success:** Green border, light green background
- **No icons by default** (add if needed for clarity)

### Progress Bars
- **Track:** Light gray (`#E2E8F0`)
- **Fill:** Metro Red (`#DE1927`)
- **Height:** 8px
- **Border Radius:** Full pill
- **No animation**

---

## Do's and Don'ts

### ✅ Do
- Use Navy for all body text
- Use Blue pill buttons for most actions (75%)
- Use Red pill buttons for critical actions only (25%)
- Use Blue for all links and focus states
- Keep cards flat with thin borders
- Use spacing for hierarchy
- Test color contrast
- Use outlined icons with 2px stroke

### ❌ Don't
- Use black or dark gray for text
- Add shadows to any element
- Use filled/solid icons
- Make non-button elements look like buttons
- Use brand red for error states
- Use red buttons for common actions (Login, Continue, Save)
- Add gradients or textures
- Use more than 2 font weights per section

---

## Quick Reference

### CSS Variables
```css
:root {
  /* Brand */
  --brand-blue: 0 70 173;
  --brand-red: 222 25 39;
  --text-navy: 0 13 69;
  --bg-offwhite: 254 249 249;

  /* Semantic */
  --primary: var(--brand-blue);   /* Blue is PRIMARY (75%) */
  --accent: var(--brand-red);     /* Red is ACCENT (25%) */
  --foreground: var(--text-navy);
  --background: var(--bg-offwhite);
  --destructive: 192 22 34;
  --success: 22 163 74;           /* #16A34A */
  --warning: 234 88 12;           /* #EA580C */

  /* Radius */
  --radius-lg: 12px;
  --radius-pill: 9999px;
}
```

### Utility Classes
```tsx
// Primary button (Blue - 75%)
<Button>Login</Button>

// Accent button (Red - 25% critical actions)
<Button variant="accent">Confirm Payment</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// Navy text (default)
<p className="text-foreground">Text</p>

// Blue link
<a className="text-primary hover:underline">Link</a>

// Card
<Card className="shadow-none">Content</Card>

// Focus ring
<input className="focus-visible:ring-2 focus-visible:ring-ring" />
```

---

## Mobile-First Principles

### Touch Targets
- **Minimum size:** 44px × 44px (Apple/Android guidelines)
- **Preferred size:** 48px × 48px for primary actions
- **Spacing:** Minimum 8px between touch targets
- **Never use hover-only interactions** — All actions must work with tap

### Mobile Layout
- **Design from mobile up:** Start with 375px viewport, scale to desktop
- **Safe areas:** Account for iOS notch, Android gesture bars
- **Bottom-heavy UI:** Place primary actions in bottom 1/3 of screen (thumb zone)
- **Single column default:** Stack elements vertically on mobile
- **Horizontal scrolling:** Use for account cards, categories (not full pages)

### Mobile Typography
| Element | Mobile | Tablet | Desktop | Usage |
|---------|--------|--------|---------|-------|
| **H1** | 28px | 32px | 36px | Page titles |
| **H2** | 24px | 28px | 30px | Section headers |
| **H3** | 20px | 22px | 24px | Subsections |
| **Balance** | 32px | 36px | 40px | Account balance numbers |
| **Body** | 16px | 16px | 16px | Primary content |
| **Small** | 14px | 14px | 14px | Secondary text |

### Mobile Spacing
- **Viewport padding:** 16px (mobile), 24px (tablet), 32px (desktop)
- **Card spacing:** 12px gap (mobile), 16px (tablet), 24px (desktop)
- **Section spacing:** 24px (mobile), 32px (tablet), 48px (desktop)

### Mobile Navigation
- **Primary:** Bottom tab bar (4-5 items max)
- **Secondary:** Hamburger drawer or top tabs
- **Tertiary:** Inline links, sheets
- **Back navigation:** Browser back + app-level breadcrumbs

---

## Banking-Specific Components

### Account Card
**Purpose:** Display account summary in horizontal scrollable list

**Anatomy:**
- Account type (text-sm, semibold, Navy)
- Account balance (text-3xl, bold, Navy)
- Account number masked (•••• 1234)
- Trend indicator (up/down arrow with percentage)
- Optional: Available balance, pending amount

**Styling:**
- Width: 280px (fixed for horizontal scroll)
- Height: Auto (min 140px)
- Background: White
- Border: 1px solid #E2E8F0
- Border Radius: 12px
- Padding: 20px
- Shadow: None

**States:**
- Default: White background
- Pressed: bg-muted (#F8FAFC)
- Selected: 2px Blue border

### Transaction List Item
**Purpose:** Display individual transaction in list view

**Anatomy:**
- Icon (merchant category, 40px circle)
- Merchant name (text-base, semibold, Navy)
- Transaction description (text-sm, muted)
- Date/time (text-xs, muted)
- Amount (text-lg, bold, Navy or Green)
- Swipe actions: Archive, Delete

**Styling:**
- Height: 72px (touch-optimized)
- Padding: 16px
- Border-bottom: 1px solid #E2E8F0
- Background: White
- Tap area: Full width

**States:**
- Default: White background
- Pressed: bg-muted
- Swiped: Reveal colored action buttons (red for delete, gray for archive)

### Currency Input
**Purpose:** Input for monetary amounts with proper formatting

**Features:**
- Currency symbol prefix (£, $, €)
- Automatic comma insertion (1,000.00)
- Decimal precision (2 places)
- Mobile number keyboard
- Large touch target (min 52px height)

**Styling:**
- Height: 56px (mobile), 52px (desktop)
- Font size: 24px (large for balance entry)
- Text align: Right
- Font weight: Bold
- Border: 1px solid #E2E8F0
- Focus: 2px Blue ring

### Balance Display
**Purpose:** Prominent account balance with privacy toggle

**Anatomy:**
- Label (text-sm, muted, "Available Balance")
- Balance amount (text-4xl, bold, Navy)
- Trend indicator (up/down arrow, percentage, color-coded)
- Show/hide toggle (eye icon)

**Styling:**
- Padding: 24px
- Background: muted or white
- Border radius: 12px

**States:**
- Visible: Full number displayed
- Hidden: •••• ••••
- Toggle icon changes: Eye to Eye-off

### OTP Input
**Purpose:** 6-digit verification code entry

**Features:**
- 6 individual boxes (auto-focus next)
- Mobile number keyboard
- Auto-paste from SMS
- Large touch targets (52px × 52px)

**Styling:**
- Box size: 48px × 56px
- Gap: 8px
- Border: 2px solid #E2E8F0
- Font size: 24px
- Text align: Center
- Focus: Blue border

### Quick Actions Grid
**Purpose:** 2×2 or 3×3 grid of common banking tasks

**Features:**
- Icon + label buttons
- Pill shaped
- Equal width/height
- Touch-optimized spacing

**Styling:**
- Button size: Min 100px × 100px (mobile)
- Gap: 12px
- Icon: 28px
- Text: 12px, medium weight
- Background: White
- Border: 1px solid #E2E8F0

**Actions:**
- Make Payment
- Add Payee
- Transfer
- View Statements
- Pay Bills
- Request Money

### Bottom Sheet
**Purpose:** Mobile-friendly modal from bottom of screen

**Features:**
- Slides up from bottom
- Drag handle at top
- Dismissible by swipe down
- Max height: 90vh
- Backdrop overlay

**Styling:**
- Border radius: 20px (top corners only)
- Background: White
- Padding: 24px
- Handle: 40px × 4px, gray, rounded-full

### Bottom Tab Navigation
**Purpose:** Primary navigation for mobile app

**Anatomy:**
- 4-5 tabs max
- Icon + label
- Active state indicator

**Styling:**
- Height: 64px (includes safe area)
- Background: White
- Border-top: 1px solid #E2E8F0
- Tab button: 48px tap target
- Icon: 24px
- Active: Metro Blue icon + text
- Inactive: Muted icon + text

**Tabs:**
1. Home (house icon)
2. Accounts (wallet icon)
3. Payments (send icon)
4. More (menu icon)

---

## Version History

- **v1.0** — Initial Metro Banking flat UI design system
- Brand colors defined (Red, Navy, Blue, Off-white)
- Flat UI principles established (no shadows)
- Component library scaffolded with shadcn/ui
- RGB color system with alpha support implemented

- **v1.1** — Mobile-first enhancements
- Mobile touch targets defined (44px minimum)
- Banking-specific components documented
- Mobile typography scale added
- Mobile spacing system defined
- Bottom navigation, transaction lists, currency inputs specified

- **v2.0** — Blue-primary color strategy
- **Breaking change:** Swapped primary/accent colors (Blue is now primary)
- Blue buttons now used for 75% of actions (Login, Continue, Save)
- Red buttons reserved for 25% critical actions (Payments, Transfers)
- Updated semantic colors: Success #16A34A, Warning #EA580C
- Border radius updated: Cards 12px (was 14px)
- Pill border radius: 9999px for buttons and badges
- Button font-weight: medium (was semibold)

---

## Resources

- **Design System Demo:** `/design-system`
- **Tailwind Config:** `tailwind.config.ts`
- **Global Styles:** `app/globals.css`
- **Component Library:** `components/ui/`
- **Technical Docs:** `DESIGN_SYSTEM.md`

---

**Metro Banking** — Trust through simplicity.
