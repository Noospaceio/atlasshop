/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vellum: "#EBE3CF",
        parchment: "#DDD0AE",
        ink: "#2B2013",
        umber: "#5B4630",
        rust: "#8C4A2F",
        moss: "#4A5A3A",
        gilt: "#A9852F",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'EB Garamond'", "Georgia", "serif"],
      },
      backgroundImage: {
        vellumtex:
          "radial-gradient(circle at 20% 20%, rgba(169,133,47,0.08), transparent 40%), radial-gradient(circle at 80% 60%, rgba(92,70,40,0.08), transparent 45%)",
      },
    },
  },
  plugins: [],
};
