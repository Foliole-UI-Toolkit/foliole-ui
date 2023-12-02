import { color, btn, ui } from './src/theme.js'

console.log(color)

const config = {
  output: './src/pollen.css',
  modules: {
    color: color,
    btn: btn,
    ui: ui,
  },
}

export default config
