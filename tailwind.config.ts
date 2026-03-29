import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#0d0d12",
          2: "#13131c",
          3: "#1a1a28",
        },
        card: {
          DEFAULT: "#1e1e2e",
          2: "#252538",
        },
        accent: {
          DEFAULT: "#a78bfa",
          2: "#7c3aed",
          glow: "rgba(167,139,250,0.25)",
        },
        brand: {
          pink: "#f472b6",
          teal: "#2dd4bf",
          amber: "#fbbf24",
          green: "#4ade80",
          red: "#f87171",
        },
        text: {
          DEFAULT: "#f1f0ff",
          2: "#9896b0",
          3: "#5c5a78",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          2: "rgba(255,255,255,0.14)",
        },
      },
      borderRadius: {
        xl: "18px",
        "2xl": "24px",
      },
      boxShadow: {
        accent: "0 4px 20px rgba(124,58,237,0.4)",
        "accent-sm": "0 0 20px rgba(167,139,250,0.25)",
      },
      animation: {
        pulse2: "pulse2 1.4s ease infinite",
        slideUp: "slideUp 0.3s ease",
        callRing: "callRing 1.5s ease infinite",
        speaking: "speaking 0.8s ease-in-out infinite alternate",
      },
      keyframes: {
        pulse2: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        callRing: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.2)", opacity: "0" },
        },
        speaking: {
          from: { boxShadow: "0 0 0 2px #a78bfa, 0 0 8px rgba(167,139,250,0.3)" },
          to: { boxShadow: "0 0 0 5px #a78bfa, 0 0 24px rgba(167,139,250,0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
