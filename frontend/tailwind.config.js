/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueviolet: '#8A2BE2',  // Hex code for blueviolet
      },
      fontFamily: {
        'font-awesome': ['Font Awesome 6 Free', 'sans-serif'],
      },
    },
  },
  plugins: [],
}