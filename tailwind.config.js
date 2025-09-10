/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'brand-primary': '#6d7cff',
        'brand-muted': '#64748b',
        'chip-bg': '#f1f5f9',
        'chip-border': '#e2e8f0',
        'tint-a': '#ffd9e8',
        'tint-b': '#e3f2ff',
        'tint-c': '#e8ffe9',
      },
      borderRadius: {
        'xl': '1rem',
        'pill': '9999px',
      },
      boxShadow: {
        'elevated': '0 6px 24px -8px rgba(15,23,42,.18)',
        'subtle': '0 1px 2px rgba(0,0,0,.06)',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(currentColor 1.25px, transparent 1.25px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'blob': 'blob 20s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0.6', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}