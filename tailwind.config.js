/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/views/**/*.{html,js,vue}',
    './src/components/**/*.{html,js,vue}',
  ],
  theme: {
    extend: {
        keyframes: {
            whatsappMove: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-14px)" },
          "50%": { transform: "translateX(0)" },
          "75%": { transform: "translateX(-14px)" },
          "100%": { transform: "translateX(0)" },
        },
        floatX: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-12px)" },
        },
      },
      animation: {
        "float-x": "floatX 3s ease-in-out infinite",
        "whatsapp-move": "whatsappMove 2.2s ease-in-out infinite",

      },
      colors: {
        'primary': '#9c8749',
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