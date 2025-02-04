// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF4C4C',
        red: '#C41E3A',
        secondary: '#FFA726',
        dark: '#2C1810',
        accent: '#4CAF50',
        background: '#FFF9F0',
      },
      fontFamily: {
        display: ['Pacifico', 'cursive'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
