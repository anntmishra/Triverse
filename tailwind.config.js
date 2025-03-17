// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
      },
      colors: {
        "bright-pink": "#ea8eea",
        "primary-purple": "#925da1",
        "dark-purple": "#4c1d95",
      },
      animation: {
        ping: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        fadeInUp: "fadeInUp 0.8s forwards ease-out",
        fadeIn: "fadeIn 1s forwards",
        slideUp: "slideUp 0.8s forwards",
        pulseDivider: "pulseDivider 3s infinite",
        glowBorder: "glowBorder 1.5s infinite alternate",
      },
      keyframes: {
        ping: {
          "75%, 100%": {
            transform: "scale(2.2)",
            opacity: "0",
          },
        },
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(234, 142, 234, 0.3)",
        "glow-md": "0 0 20px rgba(234, 142, 234, 0.6)",
        "glow-lg": "0 0 30px rgba(234, 142, 234, 0.8)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
