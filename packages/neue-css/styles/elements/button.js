module.exports = {
  button: {
    '.btn-p-sm': {
      padding: 'var(--btn-p-sm)',
      // temporary - will have have a specific class for this.
      fontSize: 'var(--btn-font-sm-size)',
    },
    '.btn-p-md': {
      padding: 'var(--btn-p-base)',
      // temporary - will have have a specific class for this.
      fontSize: 'var(--btn-font-size)',
    },
    '.btn-p-lg': {
      padding: 'var(--btn-p-lg)',

      // temporary - will have have a specific class for this.
      fontSize: 'var(--btn-font-lg-size)',
    },
    '.btn-chip-p': {
      padding: 'var(--btn-chip-p)',
      fontSize: 'var(--btn-font-sm-size)',
    },
    '.btn-base': {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      borderRadius: 'var(--ui-button-roundness)',
      transition: 'filter 0.2s ease-in-out, transform 0.2s ease-in-out',
    },
    '.btn-base:hover': {
      transform: 'scale(var(--btn-hover-scale))',
      filter: 'brightness(var(--btn-hover-filter))',
    },
    '.btn-base:active': {
      transform: 'scale(var(--btn-active-scale))',
      filter: 'brightness(var(--btn-active-filter))',
    },
  },
}
