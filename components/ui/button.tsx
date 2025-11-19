import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-pill text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 shadow-none",
  {
    variants: {
      variant: {
        // Primary (Red): Marketing design - Red CTAs for primary actions
        default: "bg-accent text-accent-foreground hover:bg-accent/95 active:bg-accent/90 border-0",
        // Blue: Secondary CTAs
        blue: "bg-primary text-primary-foreground hover:bg-primary/95 active:bg-primary/90 border-0",
        // Secondary: Transparent with red border (marketing design)
        secondary:
          "bg-transparent text-accent hover:bg-accent/10 active:bg-accent/20 border-2 border-accent",
        // Destructive/Error: For dangerous actions
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/95 active:bg-destructive/90 border-0",
        // Outline: Light border, navy text
        outline:
          "border-2 border-border bg-background hover:bg-muted active:bg-muted/80 text-foreground",
        // Ghost: Subtle actions, navigation
        ghost: "hover:bg-muted active:bg-muted/80 text-primary",
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

