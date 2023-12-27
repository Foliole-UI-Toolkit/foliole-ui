// url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>")

module.exports = {
  accordion: {
    '.accordion': {
      display: 'flex',
      'flex-direction': 'column',
      width: '100%',
    },
    '.accordion-header': {
      display: 'flex',
      'justify-content': 'space-between',
      width: '100%',
      padding: 'var(--el-p-base)',
    },
    '.header-control': {
      padding: 'var(--el-p-base)',
      'background-image':
        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>\')',
      height: '24px',
      width: '24px',
      'background-repeat': 'no-repeat',
      'background-position': 'right var(--el-sm) center',
      'background-size': 'var(--el-p-triple)',
      padding: 'var(--el-p-base) var(--el-p-double)',
      transition: 'transform 0.5s ease-in-out',
    },
    '.opened .header-control': {
      transform: 'rotate(-90deg)',
    },
    '.accordion-section-wrapper': {
      display: 'grid',
      'grid-template-rows': '0fr',
      padding: '0',
      transition: 'grid-template-rows 0.5s ease-in-out',
    },
    '.opened .accordion-section-wrapper': {
      'grid-template-rows': '1fr',
      padding: 'var(--el-p-base)',
    },
    '.accordion-section': {
      overflow: 'hidden',
    },
  },
}
