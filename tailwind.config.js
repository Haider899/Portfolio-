export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
  extend: {
    colors: {
      midnight: '#0a0a0a',      /* Deepest base */
      'card-gray': '#161617',   /* Slightly lighter for cards */
      'border-gray': '#2d2d2e', /* Subtle borders */
      'neon-teal': '#00a3cc',   /* Accent color */
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
  },
},
  plugins: [],
}
