module.exports = {
  appShell: {
    '.app-shell': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
    },
    '.site-header': {
      display: 'flex',
      flex: 'none',
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
      flex: 'column',
      flex: 1,
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
