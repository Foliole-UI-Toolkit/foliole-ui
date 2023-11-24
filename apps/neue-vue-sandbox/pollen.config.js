import { colors } from './theme'

module.exports = {
  output: './src/assets/pollen.css',
  modules: {
    alpha: {
      'full-opacity': 1,
      'semi-translucent': 0.75,
      translucent: 0.5,
      'more-translucent': 0.25
      // Add more alpha levels if needed
    },
    color: colors
  }
}
