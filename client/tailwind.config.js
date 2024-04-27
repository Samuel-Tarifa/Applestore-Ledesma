/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple600: "#7C3AED",
        white: "#FFFFFF",
        purple300: "#C4B5FD",
        black: "#111827",
        green: "#00E510",
        gray:'#F5F5F5'
      },
    },
  },
  plugins: [],
};
