/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        custom: {
          'faf8f5': '#FAF8F5',
          'maplered': '#D24545',
          'lightmaplered': '#e07d7d',
      },
    },
  },
},
  plugins: [],
}

