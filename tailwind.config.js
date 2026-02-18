/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#E8E3F9',
        'background-light': '#F5F3FF',
        'background-dark': '#1E1940',
        'charcoal': '#312773',
        'muted-beige': '#7B6FA0',
        'border-beige': '#D4CEF0',
        'accent': '#5B44F2',
        'accent-light': '#8466F2',
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
        'fadeInUp': 'fadeInUp 0.5s ease-out both',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
