import { test, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Swatch from './Swatch.svelte'

test('Swatch renders without throwing', () => {
  expect(() => render(Swatch)).not.toThrow()
})

test('renders the correct number of swatches', () => {
  const { container } = render(Swatch, { stops: ['mlt', 'base', 'mdk'] })
  expect(container.querySelectorAll('.grid').length).toBe(3)
})

test('renders the "Text" label for the "base" swatch', () => {
  const { getByText } = render(Swatch, { stops: ['base'] })
  expect(getByText('Text')).toBeInTheDocument()
})

test('applies the correct color classes to the swatches', () => {
  const { queryAllByTestId } = render(Swatch, { color: 'primary', stops: ['mlt', 'base', 'mdk'] })
  const swatches = queryAllByTestId('swatch')

  expect(swatches[0].className.split(' ')).toContain('bg-primary-mlt')
  expect(swatches[1].className.split(' ')).toContain('bg-primary')
  expect(swatches[2].className.split(' ')).toContain('bg-primary-mdk')
})
