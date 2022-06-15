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
        theme: {
          50: withOpacityValue('--color-theme-50'),
          100: withOpacityValue('--color-theme-100'),
          200: withOpacityValue('--color-theme-200'),
          300: withOpacityValue('--color-theme-300'),
          400: withOpacityValue('--color-theme-400'),
          500: withOpacityValue('--color-theme-500'),
          600: withOpacityValue('--color-theme-600'),
          700: withOpacityValue('--color-theme-700'),
          800: withOpacityValue('--color-theme-800'),
          900: withOpacityValue('--color-theme-900'),
        },
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
        'inner-light': 'inset 1px 2px 4px 0 rgb(0 0 0 / 0.05)',
        'inner-dark': 'inset 1px 2px 4px 0 rgb(0 0 0 / 0.95)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
