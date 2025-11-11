import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", "[data-theme=\"dark\"]"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem", /* 9px */
        md: ".375rem", /* 6px */
        sm: ".1875rem", /* 3px */
        /* HITRUMBLE START - Border Radii */
        hrsm: "var(--hr-r-sm)",
        hrmd: "var(--hr-r-md)",
        hrlg: "var(--hr-r-lg)",
        hrxl: "var(--hr-r-xl)",
        hrpill: "var(--hr-r-pill)",
        /* HITRUMBLE END */
      },
      colors: {
        /* HITRUMBLE START - HitRumble Colors */
        bg: {
          DEFAULT: "hsl(var(--hr-bg) / <alpha-value>)",
          surface: "hsl(var(--hr-surface) / <alpha-value>)",
          surface2: "hsl(var(--hr-surface-2) / <alpha-value>)"
        },
        fg: {
          DEFAULT: "hsl(var(--hr-fg) / <alpha-value>)",
          muted: "hsl(var(--hr-fg-muted) / <alpha-value>)",
          secondary: "hsl(var(--hr-fg-2) / <alpha-value>)"
        },
        accent: {
          DEFAULT: "hsl(var(--hr-accent) / <alpha-value>)",
          alt: "hsl(var(--hr-accent-2) / <alpha-value>)",
          highlight: "hsl(var(--hr-highlight) / <alpha-value>)"
        },
        info: "hsl(var(--hr-info) / <alpha-value>)",
        success: "hsl(var(--hr-success) / <alpha-value>)",
        warning: "hsl(var(--hr-warning) / <alpha-value>)",
        danger: "hsl(var(--hr-danger) / <alpha-value>)",
        /* HITRUMBLE END */
        // Flat / base colors (regular buttons)
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        // NOTE: shadcn accent replaced by HitRumble accent (above)
        // accent: {
        //   DEFAULT: "hsl(var(--accent) / <alpha-value>)",
        //   foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        //   border: "var(--accent-border)",
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)"
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
      },
      /* HITRUMBLE START - Shadows */
      boxShadow: {
        hr: "var(--hr-shadow-card)",
        glow: "var(--hr-shadow-glow)"
      },
      /* HITRUMBLE END */
      fontFamily: {
        /* HITRUMBLE START - Fonts */
        display: ['"Clash Display"', "Satoshi", "system-ui", "sans-serif"],
        body: ["Inter", "Manrope", "system-ui", "sans-serif"],
        /* HITRUMBLE END */
        sans: ["Poppins", "var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["JetBrains Mono", "var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      /* HITRUMBLE START - Typography Scale */
      fontSize: {
        xs: "var(--hr-fs-xs)",
        sm: "var(--hr-fs-sm)",
        base: "var(--hr-fs-md)",
        lg: "var(--hr-fs-lg)",
        xl: "var(--hr-fs-xl)",
        "2xl": "var(--hr-fs-2xl)",
        "3xl": "var(--hr-fs-3xl)"
      },
      lineHeight: {
        tight: "var(--hr-lh-tight)",
        normal: "var(--hr-lh-normal)",
        loose: "var(--hr-lh-loose)"
      },
      /* HITRUMBLE END */
      keyframes: {
        /* HITRUMBLE START - Keyframes */
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.06)" }
        },
        pulseGlow: {
          "0%": { boxShadow: "0 0 0 0 rgba(255,79,79,0.6)" },
          "70%": { boxShadow: "0 0 0 16px rgba(255,79,79,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,79,79,0)" }
        },
        wave: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        },
        /* HITRUMBLE END */
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        /* HITRUMBLE START - Animations */
        beat: "beat 800ms ease-in-out",
        pulseGlow: "pulseGlow 2s ease-out infinite",
        wave: "wave 4s linear infinite",
        /* HITRUMBLE END */
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      /* HITRUMBLE START - Background Images */
      backgroundImage: {
        "hr-brand": "var(--hr-grad-brand)",
        "hr-cta": "var(--hr-grad-cta)"
      },
      /* HITRUMBLE END */
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
