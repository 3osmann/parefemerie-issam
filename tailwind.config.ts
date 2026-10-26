import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FFF8FA",
          100: "#FCE4EC",
          200: "#F9CDDC",
          300: "#F4A9C3",
          400: "#ED7DA5",
          500: "#E24C83",
          600: "#D81B60",
          700: "#B71450",
          800: "#8E0F3E",
          900: "#4A1525",
        },
        plum: {
          DEFAULT: "#4A1525",
          deep: "#33101B",
          soft: "#6B2A3D",
        },
        cream: "#FFF8F4",
        sand: "#F7EDE8",
        ink: "#2B0F19",
        sage: "#E8EFE5",
        gold: "#DFA73C",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.28em",
      },
      boxShadow: {
        soft: "0 18px 60px -24px rgba(74, 21, 37, 0.25)",
        card: "0 24px 70px -30px rgba(74, 21, 37, 0.28)",
        pill: "0 14px 30px -14px rgba(216, 27, 96, 0.55)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.55)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-18px) rotate(2deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "spin-slow": "spin-slow 26s linear infinite",
      },
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
