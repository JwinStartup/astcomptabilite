/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('../public/assets/homeCarreaux.png')"
      }
    },
  },
  plugins: [],
}

