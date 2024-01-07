// RoundedMaker.test.ts
import { test, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'

import '@testing-library/jest-dom'
import RoundnessMaker from './RoundedMaker.svelte'
import { writable } from 'svelte/store'
import { initThemeOptions } from '../data'
import { roundedNames, elementRoundnessNames } from '../data/settings'

// Mock the store
vi.mock('../data/stores', () => {
  const mockThemeOptionsStore = () => {
    const store = writable(initThemeOptions)

    return {
      ...store,
      updateColor: () => {},
      updateColors: () => {},
      updateBtnOpts: () => {},
      updateRoundedOpts: () => {},
    }
  }

  return {
    getThemeOptionsStore: mockThemeOptionsStore,
  }
})

test('RoundnessMaker renders without throwing', () => {
  expect(() => render(RoundnessMaker)).not.toThrow()
})

test('RoundnessMaker renders select dropdowns correctly', async () => {
  const { getAllByText, getByLabelText } = render(RoundnessMaker)

  // Check if the select dropdowns are rendered
  expect(getByLabelText('Theme Roundness:')).toBeInTheDocument()
  expect(getByLabelText('Button Roundness:')).toBeInTheDocument()
  expect(getByLabelText('Input Roundness:')).toBeInTheDocument()

  // Check if the select dropdowns have the correct options
  const themeRoundnessSelect = getByLabelText('Theme Roundness:')
  const buttonRoundnessSelect = getByLabelText('Button Roundness:')
  const inputRoundnessSelect = getByLabelText('Input Roundness:')

  for (const option of roundedNames) {
    await fireEvent.change(themeRoundnessSelect, { target: { value: option } })
    expect(getAllByText(option)).not.toHaveLength(0)
  }

  for (const option of elementRoundnessNames) {
    await fireEvent.change(buttonRoundnessSelect, { target: { value: option } })
    expect(getAllByText(option)).not.toHaveLength(0)

    await fireEvent.change(inputRoundnessSelect, { target: { value: option } })
    expect(getAllByText(option)).not.toHaveLength(0)
  }
})

test('RoundnessMaker dispatches roundedInputChange event when select dropdown value is changed', async () => {
  const { getByLabelText, component } = render(RoundnessMaker)
  const themeRoundnessSelect = getByLabelText('Theme Roundness:')

  let eventDispatched = false
  component.$on('roundedInputChange', () => {
    eventDispatched = true
  })

  await fireEvent.change(themeRoundnessSelect, { target: { value: 'rounded' } })

  expect(eventDispatched).toBe(true)
})
