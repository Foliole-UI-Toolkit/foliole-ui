// url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>")

module.exports = {
  accordion: {
    '.accordion': {
      display: 'flex',
      'flex-direction': 'column',
      width: '100%',
      padding: 'var(--el-p-base)',
    },
    '.accordion-section': {
      'padding-top': 'var(--el-p-base)',
    },
    '.accordion-header-button': {
      display: 'flex',
      'justify-content': 'space-between',
      width: '100%',
    },
    '.header-control': {
      padding: 'var(--el-p-base)',
      'background-image':
        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>\')',
      'background-repeat': 'no-repeat',
      'background-position': 'right var(--el-p-sm) center',
      'background-size': 'var(--el-p-triple)',
      padding: 'var(--el-p-base) var(--el-p-double)',
    },
  },
}
