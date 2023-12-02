module.exports = {
  button: {
    '.btn-p-sm': {
      padding: 'var(--btn-p-sm)',
      // temporary - will have have a specific class for this.
      fontSize: 'var(--scale-00)',
    },
    '.btn-p-md': {
      padding: 'var(--btn-p-base)',
      // temporary - will have have a specific class for this.
      fontSize: 'var(--scale-0)',
    },
    '.btn-p-lg': {
      padding: 'var(--btn-p-lg)',

      // temporary - will have have a specific class for this.
      fontSize: 'var(--scale-1)',
    },
    '.btn-chip-p': {
      padding: 'var(--btn-chip-p)',
      fontSize: 'var(--scale-00)',
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
      filter: 'brightness(95%)',
      transform: 'scale(.98)',
    },
    '.btn-base:active': {
      transform: 'scale(1.05)',
      filter: 'brightness(101%)',
    },
  },
}
