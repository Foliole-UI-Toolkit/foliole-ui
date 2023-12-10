module.exports = {
  appRail: {
    /* Base styles */
    '.app-rail': {
      display: 'grid',
      'grid-template-rows': 'auto 1fr auto',
      'overflow-y': 'auto',
      height: '100%',
    },
    '.app-rail-options': {
      width: '5rem',
    },
    /* Region Styles */
    '.app-rail-region-lead, .app-rail-region-default, .app-rail-region-tail': {
      'box-sizing': 'border-box',
    },
    /* Item and Item Wrapper Styles */
    '.rail-tile-wrapper': {
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'stretch',
      width: '100%',
      cursor: 'pointer',
    },
    '.rail-tile-wrapper-options': {
      'aspect-ratio': '1',
      'text-align': 'center',
      fontSize: 'var(--scale-00)',
    },
    '.rail-tile-content-wrapper': {
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
      height: '100%',
    },
    '.rail-item': {
      height: '100%',
      display: 'flex',
      'flex-direction': 'column',
    },
    '.rail-item-options': {
      padding: 'var(--el-p-sm)',
    },
    /* Label Styles */
    '.rail-label': {
      'padding-top': 'var(--el-p-sm)',
    },
    /* Inner styles with no provided classes props. Not meant to be adjusted.
    /* Radio button for keeping track of selected */
    '.app-rail-inner.hidden-radio': {
      overflow: 'hidden',
      width: '0px',
      height: '0px',
    },
  },
}
