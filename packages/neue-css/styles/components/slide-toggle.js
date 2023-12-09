module.exports = {
  slideToggle: {
    '.slide-toggle': {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'var(--ui-input-roundness)',
    },
    '.track': {
      cursor: 'pointer',
      display: 'flex',
      borderRadius: '1000px',
    },
    '.track-xl': {
      width: 'var(--size-16)',
      height: 'var(--size-8)',
    },
    '.track-large': {
      width: 'var(--size-14)',
      height: 'var(--size-7)',
    },
    '.track-medium': {
      width: 'var(--size-12)',
      height: 'var(--size-6)',
    },
    '.track-small': {
      width: 'var(--size-10)',
      height: 'var(--size-5)',
    },
    '.thumb': {
      display: 'inline-block',
      borderRadius: '1000px',
      width: '50%',
      height: '100%',
      transform: 'scale(0.8)',
      transition: 'all 0.2s ease-in-out',
    },
    '.on': {
      transform: 'translateX(100%) scale(0.8)',
    },
  },
}
