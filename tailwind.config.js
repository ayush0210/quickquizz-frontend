/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#E6F0FF',
          200: '#B3D1FF',
          300: '#80B3FF',
          400: '#4D94FF',
          500: '#1A75FF',
          600: '#0052CC',
          700: '#003E99',
          800: '#002B66',
          900: '#001733',
        },
        'secondary': {
          100: '#FFF0E6',
          200: '#FFD1B3',
          300: '#FFB380',
          400: '#FF944D',
          500: '#FF751A',
          600: '#CC5200',
          700: '#993D00',
          800: '#662900',
          900: '#331400',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}