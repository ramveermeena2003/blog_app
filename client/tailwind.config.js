import typography from '@tailwindcss/typography'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      }
    }
  },
  plugins: [typography]
}