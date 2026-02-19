/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#E8E3F9',
        'primary-bright': '#F2EFFC',
        'background-light': '#F5F3FF',
        'background-dark': '#252055',
        'surface-dark': '#2E2968',
        'charcoal': '#312773',
        'muted-beige': '#7B6FA0',
        'border-beige': '#D4CEF0',
        'accent': '#5B44F2',
        'accent-light': '#9B85F7',
        'accent-deep': '#3A29A6',
      },
      fontFamily: {
        'display': ['Manrope', 'sans-serif'],
        'serif': ['Playfair Display', 'serif']
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px'
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.55s ease-out both',
        'fadeInUpSlow': 'fadeInUp 0.7s ease-out both',
        'fadeIn': 'fadeIn 0.4s ease-out both',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
