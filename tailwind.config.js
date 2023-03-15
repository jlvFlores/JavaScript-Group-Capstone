/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    container: {
      center: true,
    },
  },
  content: ['./src/**/*.html', './node_modules/flowbite/**/*.js', './src/**/*.js', './src/**/*.'],
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
};
