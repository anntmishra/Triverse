/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9333ea", // Purple
          dark: "#7e22ce",
          light: "#a855f7",
        },
        secondary: {
          DEFAULT: "#3b82f6", // Blue
          dark: "#2563eb",
          light: "#60a5fa",
        },
        accent: {
          DEFAULT: "#ec4899", // Pink
          dark: "#db2777",
          light: "#f472b6",
        },
        background: {
          DEFAULT: "#0a0a1a",
          dark: "#050510",
          light: "#151530",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ['"Playfair Display"', "serif"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(147, 51, 234, 0.5)",
      },
    },
  },
  plugins: [],
};
