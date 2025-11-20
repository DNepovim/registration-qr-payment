/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        head: ["skautbold", "sans-serif"],
        sans: ["themix", "sans-serif"],
      },
      colors: {
        bg: "#f0e6cb",
        second: "#657F6F",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
