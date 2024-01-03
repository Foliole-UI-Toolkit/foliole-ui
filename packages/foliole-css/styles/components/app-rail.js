module.exports = {
  appRail: {
    /* Base styles */
    '.f0l__app-rail': {
      display: 'grid',
      'grid-template-rows': 'auto 1fr auto',
      'overflow-y': 'auto',
      height: '100%',
    },
    '.f0l__app-rail.f0l_app-rail-opts': {
      width: '5rem',
    },
    /* Region Styles */
    '.f0l__app-rail .f0l_app-rail-region-lead, .f0l__app-rail .f0l_app-rail-region-default, .f0l__app-rail .f0l_app-rail-region-tail':
      {
        'box-sizing': 'border-box',
      },
    /* Item and Item Wrapper Styles */
    '.f0l__app-rail .f0l_rail-tile-wrapper': {
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'stretch',
      width: '100%',
      cursor: 'pointer',
    },
    '.f0l__app-rail .f0l_rail-tile-wrapper-opts': {
      'aspect-ratio': '1',
      'text-align': 'center',
      fontSize: 'var(--font-sm)',
    },
    '.f0l__app-rail .f0l_rail-tile-content-wrapper': {
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
      height: '100%',
    },
    '.f0l__app-rail .f0l_rail-item': {
      height: '100%',
      display: 'flex',
      'flex-direction': 'column',
    },
    '.f0l__app-rail .f0l_rail-item-opts': {
      padding: 'var(--el-sm)',
    },
    /* Label Styles */
    '.f0l__app-rail .f0l_rail-label': {
      'padding-top': 'var(--el-sm)',
    },
    /* Inner styles with no provided classes props. Not meant to be adjusted.
    /* Radio button for keeping track of selected */
    '.f0l__app-rail .f0l_app-rail-inner.hidden-radio': {
      overflow: 'hidden',
      width: '0px',
      height: '0px',
    },
  },
}
