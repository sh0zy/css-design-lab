/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0F172A",
          panel: "#111827",
          card: "#18222F",
          soft: "#1E293B",
          line: "#243049",
        },
        accent: {
          css: "#38BDF8",
          cssDeep: "#3B82F6",
          beginner: "#60A5FA",
          intermediate: "#A78BFA",
          advanced: "#F5C16C",
          gold: "#F5C16C",
          warn: "#FBBF24",
          info: "#22D3EE",
          good: "#34D399",
          pink: "#F472B6",
        },
        ink: {
          high: "#E6EDF7",
          mid: "#94A3B8",
          low: "#5E6B85",
        },
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Hiragino Sans",
          "Noto Sans JP",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(56,189,248,.25), 0 8px 30px -12px rgba(56,189,248,.35)",
        soft: "0 6px 24px -10px rgba(0,0,0,.5)",
      },
    },
  },
  plugins: [],
};
