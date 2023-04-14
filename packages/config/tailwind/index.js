/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      colors: {
        white: "#F5F5F5",
        "light-gray": "#DBD8E3",
        haze: "#5C5470",
        "dark-gray": "#352F44",
        purple: "#2A2438",
      },
    },
  },
  plugins: [],
};
