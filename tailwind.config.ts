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
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '5rem',  // 80px desktop padding per marketing design
      },
      screens: {
        '2xl': '1280px'  // Match marketing max-width
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
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        'touch': '44px',    // Minimum touch target (Apple/Android guidelines)
        'touch-lg': '48px', // Preferred touch target
        '18': '4.5rem',     // 72px - Marketing nav height
        '22': '5.5rem',     // 88px
        '26': '6.5rem',     // 104px
        '30': '7.5rem',     // 120px
      },
      fontSize: {
        // Marketing design system typography scale
        'display': ['3.25rem', { lineHeight: '1.1', fontWeight: '700' }],  // 52px
        'h1': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],        // 40px
        'h2': ['1.75rem', { lineHeight: '1.2', fontWeight: '700' }],       // 28px
        'h3': ['1.375rem', { lineHeight: '1.3', fontWeight: '600' }],      // 22px
        'body-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '400' }], // 18px
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],        // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        // Fluid responsive variants
        'display-responsive': ['clamp(2rem, 5vw, 3.25rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h1-responsive': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h2-responsive': ['clamp(1.5rem, 3vw, 1.75rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h3-responsive': ['clamp(1.25rem, 2vw, 1.375rem)', { lineHeight: '1.3', fontWeight: '600' }],
      },
      borderRadius: {
        'xl': "20px",   // Premium cards (subscription plans)
        'lg': "16px",   // Feature cards
        'md': "12px",   // Standard cards, alerts
        'sm': "8px",    // Medium elements
        'xs': "4px",    // Inputs, small elements
        'pill': "9999px", // Buttons, badges - full pill shape
      },
      boxShadow: {
        'card': '0px 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0px 8px 24px rgba(0, 0, 0, 0.12)',
        'none': 'none',
      },
      backgroundImage: {
        'gradient-blue-hero': 'linear-gradient(180deg, #0033A0 0%, #001A72 100%)',
        'gradient-red-hero': 'linear-gradient(180deg, #E4002B 0%, #FF4A4A 100%)',
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
