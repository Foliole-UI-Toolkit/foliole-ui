const plugin = require('tailwindcss/plugin')
const { border } = require('../../packages/neue-css/styles/tokens/border')
const { button } = require('../../packages/neue-css/styles/elements/button')
const { input } = require('../../packages/neue-css/styles/elements/input')
const { background } = require('../../packages/neue-css/styles/tokens/background')
const { text } = require('../../packages/neue-css/styles/tokens/text')
const { ui } = require('../../packages/neue-css/styles/tokens/ui')

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../packages/neue-css/styles/**/*.{astro,vue,css}',
  ],
  theme: {
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
  plugins: [
    plugin(function ({ addComponents }) {
      const customComponents = {
        border,
        button,
        input,
        background,
        text,
        ui,
      }

      // this will need to be a plugin within my package.
      for (const componentName in customComponents) {
        const component = customComponents[componentName]
        for (const className in component) {
          addComponents({
            [`${className}`]: component[className],
          })
        }
      }
    }),
  ],
}
