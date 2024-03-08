/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundImage:{
       'light-gradient': 'linear-gradient(90deg, rgba(0, 133, 255, 1) 0%, rgba(212, 177, 0, 1) 50%, rgba(238, 185, 130, 1) 100%)',
       'dark-gradient': 'linear-gradient(90deg, rgba(1, 56, 52, 1) 0%, rgba(2, 33, 113, 1) 100%)'
    },
    textColor:{
      'light': 'rgba(2, 33, 113, 1)',
      'dark': 'rgba(177, 177, 190, 1)',
      // 'dark': 'rgba(212, 177, 0, 1)' yellow,
    },
    extend: {
    },
  },
  plugins: [],
}