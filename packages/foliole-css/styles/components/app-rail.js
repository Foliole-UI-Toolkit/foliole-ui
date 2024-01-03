module.exports = {
  appRail: {
    /* Base styles */
    '.foliole-v_0_app-rail': {
      display: 'grid',
      'grid-template-rows': 'auto 1fr auto',
      'overflow-y': 'auto',
      height: '100%',
    },
    '.foliole-v_0_app-rail.app-rail-options': {
      width: '5rem',
    },
    /* Region Styles */
    '.foliole-v_0_app-rail .app-rail-region-lead, .app-rail-region-default, .app-rail-region-tail': {
      'box-sizing': 'border-box',
    },
    /* Item and Item Wrapper Styles */
    '.foliole-v_0_app-rail .rail-tile-wrapper': {
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'stretch',
      width: '100%',
      cursor: 'pointer',
    },
    '.foliole-v_0_app-rail .rail-tile-wrapper-options': {
      'aspect-ratio': '1',
      'text-align': 'center',
      fontSize: 'var(--font-sm)',
    },
    '.foliole-v_0_app-rail .rail-tile-content-wrapper': {
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
      height: '100%',
    },
    '.foliole-v_0_app-rail .rail-item': {
      height: '100%',
      display: 'flex',
      'flex-direction': 'column',
    },
    '.foliole-v_0_app-rail .rail-item-options': {
      padding: 'var(--el-sm)',
    },
    /* Label Styles */
    '.foliole-v_0_app-rail .rail-label': {
      'padding-top': 'var(--el-sm)',
    },
    /* Inner styles with no provided classes props. Not meant to be adjusted.
    /* Radio button for keeping track of selected */
    '.foliole-v_0_app-rail .app-rail-inner.hidden-radio': {
      overflow: 'hidden',
      width: '0px',
      height: '0px',
    },
  },
}
