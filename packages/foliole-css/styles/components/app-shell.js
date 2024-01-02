module.exports = {
  appShell: {
    '.app-shell': {
      width: '100%',
      height: '100vh',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
    },
    '.site-header': {
      display: 'flex',
      position: 'sticky',
      top: 0,
    },
    '.site-header-options': {
      zIndex: 10,
    },
    '.site-central-wrapper': {
      display: 'flex',
      flex: 'auto',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    '.site-sidebar-left': {
      display: 'flex',
      flex: 'none',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    '.site-sidebar-left-options': {
      width: 'auto',
    },
    '.site-sitebar-right': {
      display: 'flex',
      flex: 'none',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    '.site-sidebar-right-options': {
      width: 'auto',
    },
    '.page': {
      display: 'flex',
      'flex-direction': 'column',
      flex: 1,
      overflowY: 'scroll',
      overflowX: 'hidden',
    },
    '.page-main': {
      display: 'flex',
      flex: 'none',
    },
    '.page-header': {
      display: 'flex',
      flex: 'none',
    },
    '.page-footer': {
      display: 'flex',
      flex: 'none',
    },
    '.site-footer': {
      display: 'flex',
      flex: 'none',
    },
  },
}
