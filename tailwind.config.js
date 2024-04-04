/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('../public/logo192.png')"
      }
    },
  },
  plugins: [],
}

