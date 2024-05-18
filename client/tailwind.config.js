/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple600: "#7C3AED",
        white: "#FFFFFF",
        purple300: "#C4B5FD",
        black: "#000000",
        green: "#00E510",
        gray:'#E5E7EB',
        accent:'hsl(240 4.8% 95.9%)',
        menuBorder:'hsl(240 5.9% 90%)'
      },
    },
  },
  plugins: [],
};
