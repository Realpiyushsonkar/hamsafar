/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand blue — trust, movement, reliability
        primary: {
          50: '#EEF4FF',
          100: '#DCE8FF',
          300: '#8FB4EA', // readable blue text/icons on dark surfaces
          600: '#1E5FC4',
          700: '#184A9C',
          800: '#123F76', // elevated blue surfaces in dark mode (e.g. badges)
          900: '#0B2A4A',
        },
        // Reward / CTA accent — used sparingly for money & highlights
        amber: {
          DEFAULT: '#F5A524',
          400: '#FDBB4E', // higher-contrast reward text on dark backgrounds
          600: '#DB8F13',
        },
        // Neutral ink scale for text & surfaces
        ink: {
          50: '#F9FAFB',
          100: '#F2F4F7',
          200: '#E4E7EC',
          300: '#D0D5DD',
          400: '#98A2B3', // dark-mode equivalent of ink-500 for secondary text
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1D2939', // dark-mode card/elevated-surface background
          900: '#101828', // dark-mode page background
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};