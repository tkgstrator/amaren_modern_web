/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kosugi: ['Kosugi Maru']
      }
    }
  },
  plugins: [
    require('tailwindcss-safe-area'),
    ({ addUtilities }) => {
      addUtilities({
        '.monospaced': {
          'font-feature-settings': '"tnum", "lnum"'
        }
      })
    }
  ]
}
