import { color, btn, ui } from './src/theme.js'

console.log(btn)

const config = {
  output: './src/pollen.css',
  modules: {
    color: color,
    btn: btn,
    ui: ui,
  },
}

export default config
