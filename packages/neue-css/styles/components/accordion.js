// url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>")

module.exports = {
  accordion: {
    '.accordion': {
      display: 'flex',
      'flex-direction': 'column',
      width: '100%',
      padding: '.5rem',
    },
    '.accordion-section': {
      'padding-top': '0.5rem',
    },
    '.accordion-header-button': {
      display: 'flex',
      'justify-content': 'space-between',
      width: '100%',
    },
    '.header-control': {
      padding: '0.5rem',
      'background-image':
        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>\')',
      'background-repeat': 'no-repeat',
      'background-position': 'right 0.25rem center',
      'background-size': '1.5rem',
      padding: '0.5rem 1rem',
    },
  },
}
