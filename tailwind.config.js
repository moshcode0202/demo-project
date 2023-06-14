/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './libs/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
      container: {
          center: true,
          padding: '1rem',
      },
      fontFamily: {
          Source: ['Source Sans Pro', 'sans-serif'],
      },
      colors: {
          transparent: 'transparent',
          current: 'currentColor',
          primary: '#1967D3',
          success: '#06822C',
          danger: '#E01010',
          warning: '#E39600',
          black: {
              DEFAULT: '#000',
              light: '#F7F7F7',
              dark: '#676767',
          },
          white: {
              DEFAULT: '#fff',
              light: '#DFE0EE',
              dark: '#F7F7F7',
          },
      },
      extend: {},
  },
  plugins: [
      require('@tailwindcss/forms')({
          strategy: 'class',
      }),
      require('@tailwindcss/line-clamp'),
  ],
};
