import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#F8FAFC",
          dark: "#0B1220"
        },
        card: {
          light: "#FFFFFF",
          dark: "#0F172A"
        },
        accent: {
          light: "#4F46E5",
          dark: "#6366F1"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
