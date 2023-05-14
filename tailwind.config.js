// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dataOrange : "#E5B945",
        textColor: '#A4A4A4',
        form: '#B8B8B8',
        orange: '#F2B132',
        rating: '#9E9A9A',
        hamerBurger: '#B6BDC9',
        text: '#EFEFEF',
        backround: '#312437',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // fontFamily: {
      //   // add the css variable and include fallback fonts from tailwind default theme
      //   sans: ['var(--font-sans)', ...fontFamily.sans],
      //   serif: ['var(--font-serif)', ...fontFamily.serif],
      //   mono: ['var(--font-mono)', ...fontFamily.mono],
      // },
      fontFamily: {
        serif: ['var(--font-serif)', ...fontFamily.serif],
        sans: ['var(--font-inter)', ...fontFamily.serif],
        poppins: ['Poppins', ...fontFamily.serif]
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        'extra-bold': '800',
        black: '900',
      }
    },
  },
  plugins: [
    //require('@tailwindcss/custom-forms'),
  ],
}