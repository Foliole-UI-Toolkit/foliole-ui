import { test, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/svelte'
import Example from './Example.svelte'
test('shows proper heading when rendered', () => {
  render(Example, { name: 'World' })
  const heading = screen.getByText('Hello World!')
  expect(heading).not.toBeNull()
})

test('changes button text on click', async () => {
  render(Example, { name: 'World' })
  const button = screen.getByRole('button')

  await fireEvent.click(button)

  expect(button.textContent).toBe('Button Clicked')
})
