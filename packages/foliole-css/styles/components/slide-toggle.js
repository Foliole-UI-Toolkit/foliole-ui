module.exports = {
  slideToggle: {
    '.f0l__slide-toggle': {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'var(--ui-input-roundness)',
    },
    '.f0l__slide-toggle .f0l_track': {
      cursor: 'pointer',
      display: 'flex',
      borderRadius: '1000px',
    },
    '.f0l__slide-toggle .f0l_track-xl': {
      width: 'var(--spacing-16)',
      height: 'var(--spacing-8)',
    },
    '.f0l__slide-toggle .f0l_track-large': {
      width: 'var(--spacing-14)',
      height: 'var(--spacing-7)',
    },
    '.f0l__slide-toggle .f0l_track-medium': {
      width: 'var(--spacing-12)',
      height: 'var(--spacing-6)',
    },
    '.f0l__slide-toggle .f0l_track-small': {
      width: 'var(--spacing-10)',
      height: 'var(--spacing-5)',
    },
    '.f0l__slide-toggle .f0l_thumb': {
      display: 'inline-block',
      borderRadius: '1000px',
      width: '50%',
      height: '100%',
      transform: 'scale(0.8)',
      transition: 'all 0.2s ease-in-out',
    },
    '.f0l__slide-toggle .f0l_is-toggle-on': {
      transform: 'translateX(100%) scale(0.8)',
    },
  },
}
