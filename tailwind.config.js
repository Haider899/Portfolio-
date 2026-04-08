export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#121212',
        'card-gray': '#1A1A1B',
        'border-gray': '#2D2D2E',
        'text-main': '#E0E0E0',
        'text-muted': '#888888',
        'neon-teal': '#00A3CC',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
