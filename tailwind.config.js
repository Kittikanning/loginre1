/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#800020',
        'burgundy-light': '#a03a52',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}
