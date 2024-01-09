import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import ControlsLead from './ControlsLead.svelte'

test('ControlsLead renders without throwing', () => {
  expect(() => render(ControlsLead)).not.toThrow()
})

test('renders the correct label', () => {
  const { getByText } = render(ControlsLead, { label: 'Test Label' })
  expect(getByText('Test Label')).toBeInTheDocument()
})

test('renders the correct initial color in the text input', () => {
  const { getByLabelText } = render(ControlsLead, { hex: '#BADA55' })
  const textInput = getByLabelText('Input') as HTMLInputElement
  expect(textInput.value).toBe('#BADA55')
})

test('updates the color when the color input changes', async () => {
  const { getByLabelText } = render(ControlsLead, { hex: '#BADA55' })
  const colorInput = getByLabelText('Input') as HTMLInputElement

  await fireEvent.input(colorInput, { target: { value: '#123456' } })

  expect(colorInput.value).toBe('#123456')
})
