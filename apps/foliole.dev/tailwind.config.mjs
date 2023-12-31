import plugin from 'tailwindcss/plugin'
import { twColors, twPlugin } from 'foliole-css/dist/themes/index.ts'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', 'foliole-css/**/*.{js,ts,tsx}'],
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
