🎯 Mål

Uppdatera projektets UI till HitRumble-profilen (dark-mode först, neon-accent, pulserande musiktema) med Tailwind:

Inför design tokens (CSS-variabler) för färger, typografi, radie, skuggor.

Uppdatera tailwind.config.js för färger, typsnitt, animations.

Lägg till globala stilar och komponent-utilities (knappar, taggar, kort, chip, progress).

Säkerställ tillgänglig kontrast och dark mode.

Gör icke-brytande migration: ersätt gamla variabler/klasser varsamt.

📁 Filsystem & ändringar

Skapa/uppdatera:

src/styles/tokens.css (CSS-variabler)

src/styles/globals.css (base styles + utilities)

tailwind.config.js (theme + plugins + keyframes)

src/components/ui/ (Button.tsx, Tag.tsx, Card.tsx, Chip.tsx, Progress.tsx)

src/components/brand/ (Logo.tsx – ordmärke med våg/pulse)

Bevara tidigare filer. Kommentera // HITRUMBLE START/END runt nya block.

🎨 Design tokens (CSS-variabler)

Skapa src/styles/tokens.css:

:root {
  /* MODE */
  color-scheme: dark;

  /* Backgrounds */
  --hr-bg: #0D0D0F;
  --hr-surface: #15151A;
  --hr-surface-2: #1E1E23;

  /* Text */
  --hr-fg: #F5F7FA;
  --hr-fg-2: #C9CED6;
  --hr-fg-muted: #9AA2AE;

  /* Brand & feedback */
  --hr-accent: #FF4F4F;         /* Neon coral */
  --hr-accent-2: #8A3FFC;       /* Electric purple */
  --hr-highlight: #FFD54F;      /* Cyber yellow */
  --hr-info: #4FB6FF;
  --hr-success: #39D98A;
  --hr-warning: #FFB020;
  --hr-danger: #FF5A5A;

  /* Overlays / glow */
  --hr-scrim: rgba(0,0,0,.6);
  --hr-glow: #FF4F4F26;

  /* Radii */
  --hr-r-sm: 8px;
  --hr-r-md: 16px;
  --hr-r-lg: 24px;
  --hr-r-xl: 32px;
  --hr-r-pill: 999px;

  /* Shadows */
  --hr-shadow-card: 0 8px 32px 0 #00000066;
  --hr-shadow-glow: 0 0 24px 2px var(--hr-accent);

  /* Typography scale */
  --hr-fs-xs: 12px;
  --hr-fs-sm: 14px;
  --hr-fs-md: 16px;
  --hr-fs-lg: 18px;
  --hr-fs-xl: 24px;
  --hr-fs-2xl: 32px;
  --hr-fs-3xl: 40px;

  /* Line heights */
  --hr-lh-tight: 1.1;
  --hr-lh-normal: 1.35;
  --hr-lh-loose: 1.6;

  /* Gradients */
  --hr-grad-brand: linear-gradient(90deg, #FF4F4F 0%, #8A3FFC 50%, #4FB6FF 100%);
  --hr-grad-cta: linear-gradient(90deg, #8A3FFC 0%, #FF4F4F 100%);
}

@media (prefers-color-scheme: light) {
  :root {
    /* (valfritt) ljusläge – håll allt mörkt initialt om appen är dark-first */
  }
}

🌀 Tailwind-konfig

Uppdatera tailwind.config.js:

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Mappar till CSS-variabler
        bg: {
          DEFAULT: "var(--hr-bg)",
          surface: "var(--hr-surface)",
          surface2: "var(--hr-surface-2)"
        },
        fg: {
          DEFAULT: "var(--hr-fg)",
          muted: "var(--hr-fg-muted)",
          secondary: "var(--hr-fg-2)"
        },
        accent: {
          DEFAULT: "var(--hr-accent)",
          alt: "var(--hr-accent-2)",
          highlight: "var(--hr-highlight)"
        },
        info: "var(--hr-info)",
        success: "var(--hr-success)",
        warning: "var(--hr-warning)",
        danger: "var(--hr-danger)"
      },
      borderRadius: {
        hrsm: "var(--hr-r-sm)",
        hrmd: "var(--hr-r-md)",
        hrlg: "var(--hr-r-lg)",
        hrxl: "var(--hr-r-xl)",
        hrpill: "var(--hr-r-pill)"
      },
      boxShadow: {
        hr: "var(--hr-shadow-card)",
        glow: "var(--hr-shadow-glow)"
      },
      fontFamily: {
        display: ['"Clash Display"', "Satoshi", "system-ui", "sans-serif"],
        body: ["Inter", "Manrope", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"]
      },
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
      keyframes: {
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
        }
      },
      animation: {
        beat: "beat 800ms ease-in-out",
        pulseGlow: "pulseGlow 2s ease-out infinite",
        wave: "wave 4s linear infinite"
      },
      backgroundImage: {
        "hr-brand": "var(--hr-grad-brand)",
        "hr-cta": "var(--hr-grad-cta)"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};

🌍 Globala basstilar

Skapa/uppdatera src/styles/globals.css:

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html, body, #root {
    height: 100%;
    background: var(--hr-bg);
    color: var(--hr-fg);
    font-family: theme(fontFamily.body);
  }

  /* Rubriker med display-font */
  h1,h2,h3,h4 { font-family: theme(fontFamily.display); }
}

@layer components {
  .hr-card {
    @apply bg-bg-surface rounded-hrlg shadow-hr text-fg;
  }
  .hr-btn {
    @apply inline-flex items-center justify-center rounded-hrmd px-4 py-2 font-semibold transition;
  }
  .hr-btn--primary {
    @apply text-white;
    background-image: theme(backgroundImage.hr-cta);
    background-size: 200% 100%;
    animation: wave 6s linear infinite;
    box-shadow: var(--hr-shadow-glow);
  }
  .hr-btn--ghost {
    @apply border border-white/10 bg-bg-surface2 text-fg-secondary hover:text-fg;
  }
  .hr-chip {
    @apply inline-flex items-center gap-2 rounded-hrpill px-3 py-1 text-sm bg-white/5 border border-white/10;
  }
  .hr-tag {
    @apply text-xs uppercase tracking-wide rounded-hrpill px-2 py-1 bg-accent/20 text-accent;
  }
}

@layer utilities {
  .glow { box-shadow: var(--hr-shadow-glow); }
  .pulse { animation: beat 800ms ease-in-out; }
}


Importera i din app (t.ex. main.tsx):

import './styles/tokens.css';
import './styles/globals.css';

🧩 UI-komponenter (exempel)

Button.tsx

import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ className, variant="primary", ...props }: Props) {
  const base = "hr-btn";
  const v = variant === "ghost" ? "hr-btn--ghost" : "hr-btn--primary";
  return <button className={cn(base, v, className)} {...props} />;
}


Card.tsx

import { cn } from "@/lib/cn";
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("hr-card p-4", className)} {...props} />;
}


Chip.tsx

export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="hr-chip">{children}</span>;
}


Progress.tsx

type Props = { value: number };
export function Progress({ value }: Props) {
  return (
    <div className="w-full h-2 bg-white/10 rounded-hrpill overflow-hidden">
      <div
        className="h-full bg-accent"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

🧪 Snabb QA-checklista

 Bakgrund i hela appen = bg-bg (mörk).

 Primär CTA använder .hr-btn--primary med gradient och glow.

 Text har kontrast: fg på bg ≥ WCAG AA (kontrollera kritiska views).

 States: hover/focus har tydlig visuell feedback (glow/underline/kontrast).

 Animeringar används sparsamt: beat vid rätt svar, pulseGlow vid highlight.

 Komponenter fungerar med keyboard (focus ring synlig).

🔁 Migration (hitta/ersätt)

Om tidigare färgvariabler finns, mappa:

--primary → --hr-accent

--bg → --hr-bg

--text → --hr-fg

Klass btn-primary → .hr-btn hr-btn--primary

Klass card → .hr-card

Gör ersättningar med regex i små steg och pusha som PR med diff.

📣 Copy-tone (UI)

Korta, rytmiska prompts: “Drop your guess”, “Next track!”, “Beat incoming”

Notiser: “+50 points — on beat!”, “Combo x3 — perfect timing!”

✅ Acceptanskriterier

Appen bygger och startar utan errors.

Globala färger/typsnitt syns direkt (dark mode).

Knapp, kort, chip och progress finns och används i minst en vy.

Minst en CTA har gradient och glow.

Rätt svar triggar animate-beat på relevant element.

Kontrasttest OK på huvudvy (WCAG AA).

Slut

Utför alla steg, skapa nödvändiga filer, uppdatera konfigurationer, och lämna en kort lista över ändrade filer samt eventuella TODOs (t.ex. “byt ikonpaket senare”).