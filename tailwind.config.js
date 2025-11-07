/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        dugnad: {
          yellow: '#FCE1AC',
          pink: '#F5AFBF',
          green: '#BBE19D',
          white: '#F1F5FD',
          red: '#F77563',
          beige: '#F8CF82',
          background: '#E4E3D5',
        },
      },
    },
  },
  plugins: [],
};
