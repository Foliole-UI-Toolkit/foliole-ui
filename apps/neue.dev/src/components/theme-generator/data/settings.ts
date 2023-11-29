import { type NeueDerivedColorNames, type NeueColorNames, type NeueColorScale } from '../types'

export const neueColorScale = ['light', 'mlt', 'base', 'mdk', 'dark'] as const

export const neueColorNames = [
  'primary',
  'primary-secondary',
  'primary-tertiary',
  'secondary',
  'secondary-secondary',
  'secondary-tertiary',
  'tertiary',
  'tertiary-secondary',
  'tertiary-tertiary',
  'quaternary',
  'quinary',
  'info',
  'success',
  'warning',
  'error',
  'neutral',
  'neutral-secondary',
  'neutral-tertiary',
]

// Colors are split up because derived colors have no stops and are handled differently.
export const neueDerivedColorNames = [
  'page',
  'page-contrast',
  'surface',
  'surface-contrast',
  'surface-raised',
  'surface-raised-contrast',
] as const

export const neueColorSchemes = ['triad', 'split-complimentary', 'analogous-triad', 'analogous-quad']

export const additionalColorSchemes = ['info', 'warning']

const colorProps = neueColorNames.flatMap((colorName) => {
  return neueColorScale.map((colorShade) => {
    const colorLabel = colorName.charAt(0).toUpperCase() + colorName.slice(1)
    return {
      label: `${colorLabel} ${colorShade}`,
      value: `var(--color-${colorName}-${colorShade})`,
    }
  })
})

export const inputSettings = {
  colorProps: [{ label: 'Black', value: '0 0 0' }, { label: 'White', value: '255 255 255' }, ...colorProps],
  stops: [
    { value: 'light,mlt,base,mdk,dark', label: 'All' },
    { value: 'base', label: 'Single' },
    { value: 'light,base,dark', label: 'Three: High' },
    { value: 'mlt,base,mdk', label: 'Three: Mid' },
  ],
  fonts: ['sans', 'serif', 'mono', 'system'],
  border: ['0px', '1px', '2px', '4px', '6px', '8px'],
}

export const fontSettings: Record<string, string> = {
  sans: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
  serif: `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
  mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
  system: `system-ui`,
}

export const steppedSwatchColorClassesMap = {
  all: ['light', 'mlt', 'base', 'mdk', 'dark'],
  single: ['base'],
  'three-high-contrast': ['light', 'base', 'dark'],
  'three-mid-range': ['mlt', 'base', 'mdk'],
}

export const steppedSwatchColorClasses: Record<NeueColorNames, Record<NeueColorScale, string>> = {
  primary: {
    light: 'bg-primary-light',
    mlt: 'bg-primary-mlt',
    base: 'bg-primary-base text-on-primary-token fill-on-primary-token',
    mdk: 'bg-primary-mdk',
    dark: 'bg-primary-dark',
  },
  secondary: {
    light: 'bg-secondary-light',
    mlt: 'bg-secondary-mlt',
    base: 'bg-secondary-base text-on-secondary-token fill-on-secondary-token',
    mdk: 'bg-secondary-mdk',
    dark: 'bg-secondary-dark',
  },
  tertiary: {
    light: 'bg-tertiary-light',
    mlt: 'bg-tertiary-mlt',
    base: 'bg-tertiary-base text-on-tertiary-token fill-on-tertiary-token',
    mdk: 'bg-tertiary-mdk',
    dark: 'bg-tertiary-dark',
  },
  quaternary: {
    light: 'bg-quaternary-light',
    mlt: 'bg-quaternary-mlt',
    base: 'bg-quaternary-base text-on-quaternary-token fill-on-quaternary-token',
    mdk: 'bg-quaternary-mdk',
    dark: 'bg-quaternary-dark',
  },
  quinary: {
    light: 'bg-quinary-light',
    mlt: 'bg-quinary-mlt',
    base: 'bg-quinary-base text-on-quinary-token fill-on-quinary-token',
    mdk: 'bg-quinary-mdk',
    dark: 'bg-quinary-dark',
  },
  success: {
    light: 'bg-success-light',
    mlt: 'bg-success-mlt',
    base: 'bg-success-base text-on-success-token fill-on-success-token',
    mdk: 'bg-success-mdk',
    dark: 'bg-success-dark',
  },
  warning: {
    light: 'bg-warning-light',
    mlt: 'bg-warning-mlt',
    base: 'bg-warning-base text-on-warning-token fill-on-warning-token',
    mdk: 'bg-warning-mdk',
    dark: 'bg-warning-dark',
  },
  error: {
    light: 'bg-error-light',
    mlt: 'bg-error-mlt',
    base: 'bg-error-base text-on-error-token fill-on-primary-token',
    mdk: 'bg-error-mdk',
    dark: 'bg-error-dark',
  },
  info: {
    light: 'bg-info-light',
    mlt: 'bg-info-mlt',
    base: 'bg-info-base text-on-info-token fill-on-primary-token',
    mdk: 'bg-info-mdk',
    dark: 'bg-info-dark',
  },
  neutral: {
    light: 'bg-neutral-light',
    mlt: 'bg-neutral-mlt',
    base: 'bg-neutral-base text-on-neutral-token fill-on-neutral-token',
    mdk: 'bg-neutral-mdk',
    dark: 'bg-neutral-dark',
  },
}

export const singleSwatchColorClasses: Record<NeueDerivedColorNames, { base: string }> = {
  page: {
    base: 'bg-page-base',
  },
  'page-contrast': {
    base: 'bg-page-contrast-base',
  },
  surface: {
    base: 'bg-surface-base',
  },
  'surface-contrast': {
    base: 'bg-surface-contrast-base',
  },
  'surface-raised': {
    base: 'bg-surface-raised-base',
  },
  'surface-raised-contrast': {
    base: 'bg-surface-raised-contrast-base',
  },
}

export const intensityMap: { [key: string]: number } = {
  light: 2.3,
  mlt: 1.5,
  mdk: 1.5,
  dark: 2.3,
}

export const surfaceMap = {
  white: {
    page: 3,
    surface: 2.4,
    raised: 2.1,
  },
  low: {
    page: 2.6,
    surface: 2.3,
    raised: 2,
  },
  high: {
    page: 2.5,
    surface: 2.2,
    raised: 1.9,
  },
}

export const grayHues = [0, 0.02, 0.04]

export const roundedOpts = {
  none: 'none',
  xs: '--radius-xs',
  sm: '--radius-sm',
  md: '--radius-md',
  lg: '--radius-lg',
  xl: '--radius-xl',
}

export const elementRoundness = {
  none: 'none',
  rounded: '--ui-rounded',
  circular: '--radius-full',
}
