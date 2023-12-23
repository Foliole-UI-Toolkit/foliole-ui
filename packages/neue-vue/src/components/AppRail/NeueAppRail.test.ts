// src/components/NeueAppRail.test.ts

import { render } from '@testing-library/vue'
import NeueAppRail from './NeueAppRail.vue'

/**
 * @vitest-environment jsdom
 */

it('increments value on click', async () => {
  render(NeueAppRail)
})
