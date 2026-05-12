import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0B0B",
        vault: "#141414",
        ivory: "#F4EFE6",
        stone: "#D4C4A8",
        gold: "#C6A76A",
        bronze: "#8A7B62",
        "gold-dim": "#9E7B3F",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9" }],
        "11xl": ["12rem", { lineHeight: "0.85" }],
        "12xl": ["14rem", { lineHeight: "0.82" }],
      },
      letterSpacing: {
        "ultra-wide": "0.3em",
        "mega-wide": "0.5em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
        museum: "cubic-bezier(0.43, 0.13, 0.23, 0.96)",
      },
      animation: {
        "fade-up": "fadeUp 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards",
        "fade-in": "fadeIn 1.4s ease forwards",
        "char-reveal": "charReveal 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards",
        "line-grow": "lineGrow 1.5s cubic-bezier(0.76, 0, 0.24, 1) forwards",
        float: "float 8s ease-in-out infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        "rotate-slow": "rotateSlow 40s linear infinite",
        grain: "grain 0.5s steps(1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        charReveal: {
          "0%": { opacity: "0", transform: "translateY(100%) rotateX(-90deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotateX(0deg)" },
        },
        lineGrow: {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(1deg)" },
          "66%": { transform: "translateY(-10px) rotate(-1deg)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(198, 167, 106, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(198, 167, 106, 0.5)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      backgroundImage: {
        "radial-gold":
          "radial-gradient(ellipse at center, rgba(198,167,106,0.15) 0%, transparent 70%)",
        "vignette":
          "radial-gradient(ellipse at center, transparent 40%, rgba(11,11,11,0.9) 100%)",
        "museum-light":
          "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(198,167,106,0.08) 0%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
