/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        '2xlmax': {'max': '1535px'},
        'xlmax': {'max': '1279px'},
        'lgmax': {'max': '1000px'},
        'mdmax': {'max': '767px'},
        'smmax': {'max': '639px'},
        '2xlmin': {'min': '1535px'},
        'xlmin': {'min': '1279px'},
        'lgmin': {'min': '1023px'},
        'mdmin': {'min': '767px'},
        'smmin': {'min': '639px'},
      },
    },
  },
  plugins: [],
}

