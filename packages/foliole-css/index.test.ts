// Test imports
import { expect, test } from 'bun:test'

import { getUsedCSSProps } from './scripts/index.ts'
import { camelToKebab } from './scripts/utils.ts'

import { btn } from './styles/elements/btn.js'
import { input } from './styles/elements/input.js'
import { appShell } from './styles/components/app-shell.js'
import { appRail } from './styles/components/app-rail.js'
import { accordion } from './styles/components/accordion.js'
import { drawer } from './styles/components/drawer.js'
import { slideToggle } from './styles/components/slide-toggle.js'

// Mock data
const mockToken = {
  16: '4rem',
  1.5: '0.375rem',
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  7: '1.75rem',
}

const mergedCSSInJsCompsForTW = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...drawer,
  ...slideToggle,
}

const mergeCSSInJSCompsAndElementsForTw = {
  ...mergedCSSInJsCompsForTW,
  ...btn,
  ...input,
}

// Test
test('getUsedCSSProps function', async () => {
  const result = await getUsedCSSProps(mockToken, 'spacing', mergeCSSInJSCompsAndElementsForTw)
  expect(result).toContain('--spacing-7: 1.75rem;')
  expect(result).toContain('--spacing-16: 4rem;')
  expect(result.some((key: string) => key.startsWith('--spacing-77:'))).toBeFalsy()
  expect(result.some((key: string) => key.startsWith('--spacing-1:'))).toBeFalsy()
  expect(result.some((key: string) => key.startsWith('-spacing-16:'))).toBeFalsy()
})

test('camelToKebab function', () => {
  expect(camelToKebab('uiRoundness')).toBe('ui-roundness')
  expect(camelToKebab('spacing')).toBe('spacing')
  expect(camelToKebab('font')).toBe('font')
  expect(camelToKebab('spacing1')).toBe('spacing1') // Ends with a number
  expect(camelToKebab('fontFamily')).toBe('font-family') // Two words
  expect(camelToKebab('backgroundColorNew')).toBe('background-color-new') //Three words
  expect(camelToKebab('backgroundColorNEw')).toBe('background-color-n-ew') // Double capital letter
  expect(camelToKebab('fFFont')).toBe('f-f-font') // Double capital letter further to the front
  expect(camelToKebab('fFFontTT')).toBe('f-f-font-t-t') // Double capital letters at the end
})
