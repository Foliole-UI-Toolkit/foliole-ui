module.exports = {
  appShell: {
    '.foliole-v_0_app-shell': {
      width: '100%',
      height: '100vh',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
    },
    '.foliole-v_0_app-shell .site-header': {
      display: 'flex',
      position: 'sticky',
      top: 0,
    },
    '.foliole-v_0_app-shell .site-header-options': {
      zIndex: 10,
    },
    '.foliole-v_0_app-shell .site-central-wrapper': {
      display: 'flex',
      flex: 'auto',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    '.foliole-v_0_app-shell .site-sidebar-left': {
      display: 'flex',
      flex: 'none',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    '.foliole-v_0_app-shell .site-sidebar-left-options': {
      width: 'auto',
    },
    '.foliole-v_0_app-shell .site-sitebar-right': {
      display: 'flex',
      flex: 'none',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    '.foliole-v_0_app-shell .site-sidebar-right-options': {
      width: 'auto',
    },
    '.foliole-v_0_app-shell .page': {
      display: 'flex',
      'flex-direction': 'column',
      flex: 1,
      overflowY: 'scroll',
      overflowX: 'hidden',
    },
    '.foliole-v_0_app-shell .page-main': {
      display: 'flex',
      flex: 'none',
    },
    '.foliole-v_0_app-shell .page-header': {
      display: 'flex',
      flex: 'none',
    },
    '.foliole-v_0_app-shell .page-footer': {
      display: 'flex',
      flex: 'none',
    },
    '.foliole-v_0_app-shell .site-footer': {
      display: 'flex',
      flex: 'none',
    },
  },
}
