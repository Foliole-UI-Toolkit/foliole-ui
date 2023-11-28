module.exports = {
  input: {
    '.input-base': {
      flexShrink: 1,
      background: 'var(--color-surface-base)',
    },
    '.bg-surface-base .input-base': {
      background: 'var(--color-neutral-mlt)',
    },
    '.select-base': {
      flexShrink: 1,
      background: 'var(--color-surface-base)',
      '--webkit-appearance': 'none',
      appearance: 'none',
    },
    '.bg-surface-base .select-base': {
      background: 'var(--color-neutral-mlt)',
    },
  },
}
