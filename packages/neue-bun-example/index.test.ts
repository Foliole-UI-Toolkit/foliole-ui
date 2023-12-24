// Test imports
import { expect, test } from 'bun:test'
import { findUsedCompKeys } from './index.ts'

// Mock data
const mockToken = {
  16: '4rem',
  1.5: '0.375rem',
  px: '1px',
  0: '0px',
  0.5: '0.125rem',
  7: '1.75rem',
}

// Test
test('findUsedCompKeys function', async () => {
  const result = await findUsedCompKeys(mockToken, 'spacing')
  expect(result).toContain('--spacing-16')
  expect(result).toContain('--spacing-7')
  expect(result).not.toContain('--spacing-77')
  expect(result).not.toContain('--spacing-1')
  expect(result).not.toContain('-spacing-16')
})
