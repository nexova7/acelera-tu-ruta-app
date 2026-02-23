/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        neon: {
          cyan: '#00FBFF',
          magenta: '#FF00FF',
          green: '#22c55e',
          black: '#050505'
        }
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0, 251, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 251, 255, 0.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: [],
}
