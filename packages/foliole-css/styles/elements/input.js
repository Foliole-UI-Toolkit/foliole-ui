module.exports = {
  input: {
    '.input-base': {
      flexShrink: 1,
      backgroundColor: 'rgba(var(--color-surface))',
      borderRadius: 'var(--ui-input-roundness)',
      padding: 'var(--el-p-base) var(--el-p-double)',
    },
    '.bg-surface .input-base': {
      backgroundColor: 'rgba(var(--color-neutral-mlt))',
    },
    '.select-base': {
      flexShrink: 1,
      backgroundColor: 'rgba(var(--color-surface))',
      '--webkit-appearance': 'none',
      borderRadius: 'var(--ui-input-roundness)',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' class='svg-triangle' width='100' height='100'%3E%3Cpath d='M 50,75 90,20 10,20 Z' stroke-width='20' stroke='black' stroke-linejoin='round' stroke-linecap='round'/%3E%3C/svg%3E")`,

      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right .5rem center',
      backgroundSize: '.7rem',
      padding: 'var(--el-p-base) var(--el-p-double)',
    },
    '.bg-surface .select-base': {
      backgroundColor: 'rgba(var(--color-neutral-mlt))',
    },
    ".input-color-base[type='color']": {
      width: '40px',
      height: '40px',
      border: 'none',
      borderRadius: 'var(--ui-input-roundness)',
      overflow: 'hidden',
      cursor: 'pointer',
      padding: 0,
      '-webkit-appearance': 'none',
    },
    ".input-color-base[type='color']::-webkit-color-swatch-wrapper": {
      padding: 0,
      border: 'none',
      borderRadius: 'var(--ui-input-roundness)',
    },
    ".input-color-base[type='color']::-webkit-color-swatch": {
      border: 'none',
      borderRadius: 'var(--ui-input-roundness)',
      padding: 0,
    },
    ".input-color-base[type='color']::-moz-color-swatch": {
      border: 'none',
      borderRadius: 'var(--ui-input-roundness)',
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
      borderRadius: 'var(--ui-input-roundness)',
    },
  },
}
