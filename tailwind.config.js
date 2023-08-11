/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      maxWidth: {
        '24': '24px',
      },
      minWidth: {
        '18': '18px'
      },
      keyframes: {
        fadeOut: {
          '0%': {
            opacity: 1
          },
          '100%': {
            opacity: 0
          }
        }
      }
    },
  },
  plugins: [],
}

