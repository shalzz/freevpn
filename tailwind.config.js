/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        // Typedream's layout switches to mobile below 769px
        md: '769px',
      },
      colors: {
        ink: '#282a30',
        muted: '#6b6f76',
        accent: '#6e79d6',
        brand: '#6968F7',
      },
    },
  },
  plugins: [],
}