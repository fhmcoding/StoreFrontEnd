/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/views/**/*.{html,js,vue}',
    './src/components/**/*.{html,js,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7367f0',
        'secondary': '#625f6e',
        'success': '#198754',
        
      },
      fontFamily: {
        'sans': ['Gilroy', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}