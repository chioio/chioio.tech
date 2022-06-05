const defaultTheme = require('tailwindcss/defaultTheme')

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        main: {
          50: withOpacityValue('--color-main-50'),
          100: withOpacityValue('--color-main-100'),
          200: withOpacityValue('--color-main-200'),
          300: withOpacityValue('--color-main-300'),
          400: withOpacityValue('--color-main-400'),
          500: withOpacityValue('--color-main-500'),
          600: withOpacityValue('--color-main-600'),
          700: withOpacityValue('--color-main-700'),
          800: withOpacityValue('--color-main-800'),
          900: withOpacityValue('--color-main-900'),
        },
      },
    },
  },
}
