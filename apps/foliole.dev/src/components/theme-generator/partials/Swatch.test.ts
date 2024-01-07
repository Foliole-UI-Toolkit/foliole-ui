import { test, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import Swatch from './Swatch.svelte'

test('Swatch renders without throwing', () => {
  expect(() => render(Swatch)).not.toThrow()
})
