const plugin = require('tailwindcss/plugin')

const { twColors, twPlugin } = require('../../packages/foliole-css/')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', '../../packages/foliole-css/**/*.{js}'],
  plugins: [plugin(twPlugin)],
  theme: {
    colors: {
      ...twColors,
      white: '#fff',
      black: '#000',
    },
    extend: {
      screens: {
        lg: '1060px',
      },
      fontFamily: {
        brandon: [
          'brandon-grotesque',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          "'Helvetica Foliole'",
          'Arial',
          "'Noto Sans'",
          'sans-serif',
          "'Apple Color Emoji'",
          "'Segoe UI Emoji'",
          "'Segoe UI Symbol'",
          "'Noto Color Emoji'",
        ],
      },
    },
  },
}