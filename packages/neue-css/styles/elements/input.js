module.exports = {
  input: {
    '.input-base': {
      flexShrink: 1,
      backgroundColor: 'rgba(var(--color-surface))',
      // borderRadius: 'var(--ui-input-roundness)',
      padding: 'var(--el-p-base) var(--el-p-double)',
    },
    '.bg-surface .input-base': {
      backgroundColor: 'rgba(var(--color-neutral-mlt))',
    },
    '.select-base': {
      flexShrink: 1,
      backgroundColor: 'rgba(var(--color-surface))',
      '--webkit-appearance': 'none',
      // borderRadius: 'var(--ui-input-roundness)',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right .25rem center',
      backgroundSize: '1.5rem',
      padding: 'var(--el-p-base) var(--el-p-double)',
    },
    '.bg-surface .select-base': {
      backgroundColor: 'rgba(var(--color-neutral-mlt))',
    },
    ".input-color-base[type='color']": {
      width: '40px',
      height: '40px',
      border: 'none',
      // borderRadius: 'var(--ui-input-roundness)',
      overflow: 'hidden',
      cursor: 'pointer',
      padding: 0,
      '-webkit-appearance': 'none',
    },
    ".input-color-base[type='color']::-webkit-color-swatch-wrapper": {
      padding: 0,
      border: 'none',
      // borderRadius: 'var(--ui-input-roundness)',
    },
    ".input-color-base[type='color']::-webkit-color-swatch": {
      border: 'none',
      // borderRadius: 'var(--ui-input-roundness)',
      padding: 0,
    },
    ".input-color-base[type='color']::-moz-color-swatch": {
      border: 'none',
      // borderRadius: 'var(--ui-input-roundness)',
    },
    '.input-checkbox-base, .input-radio-base': {
      width: '1.25rem',
      height: '1.25rem',
      ringWidth: '0',
      cursor: 'pointer',
      borderWidth: 'border-token',
      // focus: {
      //   brightness: '105%',
      // },
      // hover: {
      //   brightness: '105%',
      // },
    },
    '.input-radio-base': {
      // borderRadius: 'var(--ui-input-roundness)',
    },
  },
}
