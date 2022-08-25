/** @type {import('cz-git').CommitizenGitOptions} */
module.exports = {
  // @use termianl like: `git czg :i`
  alias: {
    ':': 'docs: update posts',
    'f': 'docs: fix typos',
    'r': 'docs: update README',
    'a': 'feat(theme): update page theme',
    'b': 'build: bump dependencies',
    's': 'style: update code format',
    'i': 'chore: initial commit',
    'c': 'chore: update config',
  },
  scopes: ['theme', 'posts'],
  customScopesAlign: 'top',
}
