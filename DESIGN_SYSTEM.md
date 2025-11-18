# Metro Banking Design System

A clean, trustworthy banking UI built with Next.js, Tailwind CSS, and shadcn/ui.

## Design Principles

### Flat UI
- **No shadows anywhere** - enforced globally via CSS
- Clean borders with light colors
- Soft border radius for cards (8px)
- Full border radius for buttons (pill shape)

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Metro Red** | `#DE1927` | Primary CTA buttons |
| **Metro Navy** | `#000D45` | Primary text color (replaces black/gray) |
| **Metro Blue** | `#0046AD` | Links, focus states, structural accents |
| **Off White** | `#FEF9F9` | Background canvas |
| **White** | `#FFFFFF` | Card backgrounds |

### Typography
- All body text uses **Metro Navy** (`#000D45`)
- Links use **Metro Blue** (`#0046AD`)
- Font stack: System fonts (San Francisco, Segoe UI, Roboto, etc.)

## Component Guidelines

### Buttons

#### Primary CTA
```tsx
<Button>Primary Action</Button>
```
- Background: Metro Red (`#DE1927`)
- Text: White
- Shape: Full rounded pill
- No shadow
- Hover: Slightly darker red

#### Secondary CTA
```tsx
<Button variant="secondary">Secondary Action</Button>
```
- Background: White
- Border: 2px Metro Red
- Text: Metro Red
- Shape: Full rounded pill
- No shadow
- Hover: Light gray background

#### Other Variants
- `outline` - Light border, navy text
- `ghost` - No border, transparent background
- `link` - Metro Blue text, underline on hover

### Cards

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
```

- Background: White
- Border: Thin light border
- Border radius: 8px (soft radius)
- **No shadow**
- Text: Metro Navy

### Form Elements

#### Input Fields
```tsx
<Input type="text" placeholder="Enter value" />
```
- Border: Light gray
- Text: Metro Navy
- Height: 44px (11 on Tailwind scale)
- Padding: 16px horizontal, 12px vertical
- **No shadow**
- Focus: Blue ring (Metro Blue)

#### Labels
```tsx
<Label htmlFor="input-id">Label Text</Label>
```
- Text: Metro Navy
- Font weight: Medium

#### Checkboxes & Radio Buttons
- Focus ring: Metro Blue
- Checked state: Metro Red
- **No shadows**

### Focus States
- All interactive elements use a **ring** instead of shadow
- Ring color: Metro Blue (`#0046AD`)
- Ring width: 2px
- No ring offset (flush with element)

## Implementation Details

### Tailwind Configuration
The project uses RGB color variables with alpha channel support:

```ts
colors: {
  background: "rgb(var(--background) / <alpha-value>)",
  foreground: "rgb(var(--foreground) / <alpha-value>)",
  primary: {
    DEFAULT: "rgb(var(--primary) / <alpha-value>)",
    foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
  },
  // ... other semantic colors
}
```

### CSS Variables
Semantic tokens use RGB values in `app/globals.css`:

```css
:root {
  --background: 254 249 249;      /* Off-white #FEF9F9 */
  --foreground: 0 13 69;          /* Navy #000D45 */
  --primary: 222 25 39;           /* Red #DE1927 */
  --accent: 0 70 173;             /* Blue #0046AD */
  --radius-card: 0.5rem;          /* Card border radius */
  /* ... */
}
```

This allows for alpha transparency with syntax like `bg-primary/50` (50% opacity).

### Global Shadow Removal
```css
* {
  box-shadow: none !important;
}
```

## Usage

### View Design System
Navigate to `/design-system` to see all components and patterns in action.

### Using Components
All components are pre-configured with Metro Banking styles:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function MyPage() {
  return (
    <Card>
      <CardContent>
        <Input placeholder="Enter amount" />
        <Button>Submit</Button>
        <Button variant="secondary">Cancel</Button>
      </CardContent>
    </Card>
  )
}
```

## Accessibility

- All interactive elements have proper focus states (blue ring)
- Color contrast meets WCAG AA standards
- Semantic HTML structure
- Screen reader friendly labels

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# View design system
open http://localhost:3000/design-system
```

## Component Inventory

### Installed shadcn/ui Components
- Accordion
- Alert
- Avatar
- Badge
- Button
- Card
- Checkbox
- Dialog
- Dropdown Menu
- Input
- Label
- Progress
- Radio Group
- Select
- Separator
- Sheet
- Skeleton
- Table
- Tabs
- Toast

All components have been configured for flat UI with Metro Banking colors.
