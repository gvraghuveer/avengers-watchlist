import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-secondary": "#1f2024",
        "on-primary": "#FFFFFF",
        "surface-container": "#191919",
        "background": "#0e0e0e",
        "inverse-surface": "#f9f9f9",
        "surface-container-low": "#131313",
        "on-surface-variant": "#ababab",
        "surface-variant": "#262626",
        "outline": "#757575",
        "primary-container": "#454747",
        "secondary": "#9d9da2",
        "inverse-primary": "#5e5f60",
        "primary-fixed": "#e2e2e2",
        "outline-variant": "#484848",
        "on-surface": "#e5e5e5",
        "surface-bright": "#2c2c2c",
        "surface": "#0e0e0e",
        "surface-container-highest": "#262626",
        "surface-container-high": "#1f1f1f",
        "primary": "#E62429",
        "tertiary": "#28A745"
      },
      fontFamily: {
        headline: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"
      },
    },
  },
  plugins: [],
};
export default config;
