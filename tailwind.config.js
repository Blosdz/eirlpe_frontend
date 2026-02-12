/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#f5f5db',
        'background-light': '#f8f8f6',
        'background-dark': '#1f1f13',
        'charcoal': '#171712',
        'muted-beige': '#828268',
        'border-beige': '#e4e4dd'
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
