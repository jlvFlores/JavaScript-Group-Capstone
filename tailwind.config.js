/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './node_modules/flowbite/**/*.js'],
  plugins: [
    require('flowbite/plugin')
  ],
};
