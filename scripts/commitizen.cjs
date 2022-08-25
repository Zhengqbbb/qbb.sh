/** @type {import('cz-git').CommitizenGitOptions} */
module.exports = {
  // @use termianl like: `czg :i`
  alias: {
    'a': 'feat(theme): update page theme',
    'b': 'build: bump dependencies',
    's': 'style: update code format',
    'i': 'chore: initial commit',
    'c': 'chore: update config',
    'f': 'docs: fix typos',
    'r': 'docs: update README',
    ':': 'docs: update posts',
  },
  scopes: ['theme', 'posts'],
  customScopesAlign: 'top',
}
