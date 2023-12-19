module.exports = {
  btn: {
    '.btn-sm': {
      padding: 'var(--btn-sm)',
      fontSize: 'var(--btn-font-sm-size)',
    },
    '.btn-md': {
      padding: 'var(--btn-p-base)',
      fontSize: 'var(--btn-font-size)',
    },
    '.btn-lg': {
      padding: 'var(--btn-lg)',
      fontSize: 'var(--btn-font-lg-size)',
    },
    '.btn-chip': {
      padding: 'var(--btn-chip)',
      fontSize: 'var(--btn-font-sm-size)',
    },
    '.btn-base': {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      borderRadius: 'var(--ui-btn-roundness)',
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
