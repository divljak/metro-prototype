import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    screens: {
      'xs': '375px',   // Small phones (iPhone SE)
      'sm': '640px',   // Large phones
      'md': '768px',   // Tablets
      'lg': '1024px',  // Small desktop/laptop
      'xl': '1280px',  // Desktop
      '2xl': '1536px', // Large desktop
    },
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        error: {
          DEFAULT: "rgb(var(--error) / <alpha-value>)",
          foreground: "rgb(var(--error-foreground) / <alpha-value>)",
          light: "rgb(var(--error-light) / <alpha-value>)",
          dark: "rgb(var(--error-dark) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--success) / <alpha-value>)",
          foreground: "rgb(var(--success-foreground) / <alpha-value>)",
          light: "rgb(var(--success-light) / <alpha-value>)",
          dark: "rgb(var(--success-dark) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning) / <alpha-value>)",
          foreground: "rgb(var(--warning-foreground) / <alpha-value>)",
          light: "rgb(var(--warning-light) / <alpha-value>)",
          dark: "rgb(var(--warning-dark) / <alpha-value>)",
        },
        info: {
          DEFAULT: "rgb(var(--info) / <alpha-value>)",
          foreground: "rgb(var(--info-foreground) / <alpha-value>)",
          light: "rgb(var(--info-light) / <alpha-value>)",
          dark: "rgb(var(--info-dark) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
      },
      spacing: {
        'touch': '44px',    // Minimum touch target (Apple/Android guidelines)
        'touch-lg': '48px', // Preferred touch target
      },
      fontSize: {
        // Fluid typography - responsive font sizes
        'display': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'balance': ['clamp(2rem, 4vw, 2.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h1-responsive': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
        'h2-responsive': ['clamp(1.5rem, 2.5vw, 1.875rem)', { lineHeight: '1.3' }],
        'h3-responsive': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.4' }],
      },
      borderRadius: {
        lg: "12px",     // Cards, alerts - from reference design system
        md: "8px",      // Medium elements
        sm: "4px",      // Inputs, small elements
        pill: "9999px", // Buttons, badges - full pill shape
      },
      boxShadow: {
        none: 'none'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
