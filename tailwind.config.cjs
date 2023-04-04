/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'header-bg': "url('https://images.wallpaperscraft.com/image/single/exoplanet_atmosphere_clouds_stars_101205_1920x1080.jpg')"
      },
      fontFamily: {
        'alkatra': "Alkatra, cursive"
      }
    },
  },
  plugins: [],
}
