// Test imports
import { expect, test } from 'bun:test'

import { findUsedCompKeys } from './scripts/index.ts'

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
test('findUsedCompKeys function', async () => {
  const result = await findUsedCompKeys(mockToken, 'spacing', mergeCSSInJSCompsAndElementsForTw)
  expect(result).toContain('--spacing-16')
  expect(result).toContain('--spacing-7')
  expect(result).not.toContain('--spacing-77')
  expect(result).not.toContain('--spacing-1')
  expect(result).not.toContain('-spacing-16')
})
