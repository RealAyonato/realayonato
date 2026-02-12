/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Russo One"', 'sans-serif'],
        body: ['"Rajdhani"', 'sans-serif'],
      },
      colors: {
        primary: '#DC143C', // الأحمر
      },
    },
  },
  plugins: [],
}