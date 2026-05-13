/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        bg: '#0b0d10',
        panel: '#111418',
        border: '#1f242b',
        muted: '#7a8190',
        text: '#e7eaef',
        accent: '#7c5cff',
      },
    },
  },
  plugins: [],
}
