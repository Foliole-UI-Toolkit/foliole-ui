const color = require('./theme').colors
const btn = require('./theme').btn
const ui = require('./theme').ui

module.exports = {
  output: './src/assets/pollen.css',
  modules: {
    color: color,
    btn: btn,
    ui: ui
  }
}
