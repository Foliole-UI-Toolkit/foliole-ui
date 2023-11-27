import { stringify } from 'javascript-stringify'

export function toCSSVars(prefix: string, object: { [key: string]: string | number }) {
  let iterationCount = 0 // Track the iteration

  const cssContent = stringify(
    object,
    (value, indent, stringify) => {
      iterationCount++

      // Check if the iteration is odd

      if (typeof value === 'string') {
        if (iterationCount % 2 !== 0) {
          return prefix + value // Add prefix to odd iterations
        } else {
          return value
        }
      } else {
        return stringify(value)
      }
    },
    2,
  )?.replace(/,\n/g, ';\n') // Replace ,\n or \n with ;\n

  // Remove surrounding {}
  // Remove surrounding {}
  const trimmedCssContent = cssContent ? cssContent.slice(1, -1) : ''

  // Replace trailing whitespace and newlines with ;
  return trimmedCssContent.replace(/\s+$/, ';')
}
