module.exports = {
  drawer: {
    '.drawer': {
      background: 'white',
      'overflow-y': 'auto',
      transition: 'transform',
    },
    '.drawer-backdrop': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      background: 'rgba(0, 0, 0, 0.3)',
    },
    '.drawer-backdrop-options': {
      'z-index': '40',
    },
    '.drawer-top': {
      'align-items': 'start',
      width: '100%',
      height: '50%',
      borderRadius: 'var(--ui-roundness) var(--ui-roundness) 0 0',
    },
    '.drawer-bottom': {
      'align-items': 'end',
      width: '100%',
      height: '50%',
      borderRadius: '0 0 var(--ui-roundness) var(--ui-roundness)',
    },
    '.drawer-left': {
      'justify-content': 'start',
      width: '90%',
      height: '100%',
      borderRadius: '0 var(--ui-roundness) var(--ui-roundness) 0',
    },
    '.drawer-right': {
      'justify-content': 'end',
      width: '90%',
      height: '100%',
      borderRadius: 'var(--ui-roundness) 0 0 var(--ui-roundness)',
    },
  },
}
