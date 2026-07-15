/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand blue — trust, movement, reliability
        primary: {
          50: '#EEF4FF',
          100: '#DCE8FF',
          600: '#1E5FC4',
          700: '#184A9C',
          900: '#0B2A4A',
        },
        // Reward / CTA accent — used sparingly for money & highlights
        amber: {
          DEFAULT: '#F5A524',
          600: '#DB8F13',
        },
        // Neutral ink scale for text & surfaces
        ink: {
          50: '#F9FAFB',
          100: '#F2F4F7',
          200: '#E4E7EC',
          300: '#D0D5DD',
          500: '#667085',
          700: '#344054',
          900: '#101828',
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
