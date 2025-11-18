import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 shadow-none",
  {
    variants: {
      variant: {
        // Primary (Blue): Most common button - Login, Continue, Save, Submit (75%)
        default: "bg-primary text-primary-foreground hover:bg-primary/90 border-0",
        // Accent (Red): Critical CTAs only - Confirm Payment, Transfer Funds, Apply Now (25%)
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 border-0",
        // Secondary: White with blue border
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-primary",
        // Destructive/Error: For dangerous actions
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-0",
        // Outline: Light border, navy text
        outline:
          "border-2 border-border bg-background hover:bg-muted text-foreground",
        // Ghost: Subtle actions, navigation
        ghost: "hover:bg-muted text-primary",
        // Link: For text links
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

