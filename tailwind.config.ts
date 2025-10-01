import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",                
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0ea5e9",
          muted: "#e0f2fe",
          dark: "#0369a1"
        }
      }
    },
  },
  plugins: [],
};
export default config;
