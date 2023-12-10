const plugin = require('tailwindcss/plugin')
const { background } = require('../../packages/neue-css/styles/tokens/background')
const { border } = require('../../packages/neue-css/styles/tokens/border')
const { button } = require('../../packages/neue-css/styles/elements/button')
const { input } = require('../../packages/neue-css/styles/elements/input')
const { text } = require('../../packages/neue-css/styles/tokens/text')
const { ui } = require('../../packages/neue-css/styles/tokens/ui')

const twPlugin = require('../../packages/neue-css/scripts/generate-css')

console.log(twPlugin.twPlugin)

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../packages/neue-css/styles/**/*.{astro,vue,css}',
  ],
  theme: {
    extend: {
      // colors: {
      //   'bg-primary-2': rgba(25, 255, 201),
      // },
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
  plugins: [plugin(twPlugin.twPlugin)],
}
