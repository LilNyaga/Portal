/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF0',
          100: '#FAF2DE',
          200: '#F5E7C4',
          300: '#EBD4A7',
          400: '#DEC085',
          500: '#C79F5E',
          base: '#FAF2DE',
        },
        kmtc: {
          950: '#022c22',
          900: '#064e3b',
          800: '#065f46',
          700: '#047857',
          600: '#059669',
          500: '#10b981',
          gold: '#f59e0b'
        }
      }
    },
  },
  plugins: [],
}
