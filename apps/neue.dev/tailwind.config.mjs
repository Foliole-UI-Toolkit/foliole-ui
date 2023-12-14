const plugin = require('tailwindcss/plugin')

const { twColors, twPlugin } = require('../../packages/neue-css/scripts/generate-css')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', '../../packages/neue-css/**/*.{js}'],
  plugins: [plugin(twPlugin)],
  theme: {
    colors: {
      ...twColors,
    },
    extend: {
      fontFamily: {
        brandon: [
          'brandon-grotesque',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          "'Helvetica Neue'",
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
