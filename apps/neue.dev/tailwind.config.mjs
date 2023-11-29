const plugin = require('tailwindcss/plugin')
const { button } = require('@neue/neue-css/styles/elements/button')
const { inputs } = require('@neue/neue-css/styles/elements/inputs')
const { background } = require('@neue/neue-css/styles/tokens/background')

console.log(background)

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../packages/neue-css/styles/**/*.{astro,vue,css}',
  ],
  plugins: [
    plugin(function ({ addComponents }) {
      const customComponents = {
        button,
        inputs,
        background,
        // Add more custom components if needed
      }

      // Iterate through the custom component objects and register them as Tailwind CSS classes
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
