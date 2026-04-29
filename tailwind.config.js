/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans','system-ui','sans-serif'],
        mono: ['JetBrains Mono','monospace'],
        serif: ['Instrument Serif','Georgia','serif'],
      },
      colors: {
        g1: '#185FA5', g1b: '#E6F1FB', g1d: '#B5D4F4',
        g2: '#0F6E56', g2b: '#E1F5EE', g2d: '#9FE1CB',
        g3: '#854F0B', g3b: '#FAEEDA', g3d: '#FAC775',
        g4: '#534AB7', g4b: '#EEEDFE', g4d: '#CECBF6',
        g5: '#993556', g5b: '#FBEAF0', g5d: '#F4C0D1',
        g6: '#A32D2D', g6b: '#FCEBEB', g6d: '#F7C1C1',
      },
      animation: {
        'fade-in': 'fadeIn .2s ease',
        'slide-up': 'slideUp .25s ease',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
