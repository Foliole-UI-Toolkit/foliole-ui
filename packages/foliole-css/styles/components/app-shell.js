module.exports = {
  appShell: {
    '.f0l__app-shell': {
      width: '100%',
      height: '100vh',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
    },
    '.f0l__app-shell .f0l_site-header': {
      display: 'flex',
      position: 'sticky',
      top: 0,
    },
    '.f0l__app-shell .f0l_site-header-opts': {
      zIndex: 10,
    },
    '.f0l__app-shell .f0l_site-central-wrapper': {
      display: 'flex',
      flex: 'auto',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    '.f0l__app-shell .f0l_site-sidebar-left': {
      display: 'flex',
      flex: 'none',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    '.f0l__app-shell .f0l_site-sidebar-left-opts': {
      width: 'auto',
    },
    '.f0l__app-shell .f0l_site-sitebar-right': {
      display: 'flex',
      flex: 'none',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    '.f0l__app-shell .f0l_site-sidebar-right-opts': {
      width: 'auto',
    },
    '.f0l__app-shell .f0l_page': {
      display: 'flex',
      'flex-direction': 'column',
      flex: 1,
      overflowY: 'scroll',
      overflowX: 'hidden',
    },
    '.f0l__app-shell .f0l_page-main': {
      display: 'flex',
      flex: 'none',
    },
    '.f0l__app-shell .f0l_page-header': {
      display: 'flex',
      flex: 'none',
    },
    '.f0l__app-shell .f0l_page-footer': {
      display: 'flex',
      flex: 'none',
    },
    '.f0l__app-shell .f0l_site-footer': {
      display: 'flex',
      flex: 'none',
    },
  },
}
