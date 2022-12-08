import fs from 'fs'
import { resolve } from 'pathe'

/**
 * Enhance shell script code syntax highlight for docs `shiki`
 *
 * @author Zhengqbbb <https://github.com/Zhengqbbb>
 */
const __X_THEMES = [{
  name: 'vitesse-light',
  main: '#1c6b48',
  subcmd: '#b56959',
  synopsis: '#929292',
}, {
  name: 'vitesse-dark',
  main: '#4d9375',
  subcmd: '#c98a7d',
  synopsis: '#818181',
}]
const __SHIKI_BASE_PATH = resolve(__dirname, '../../node_modules/shiki')
const __SHIKI_SHELL_PATH = resolve(__SHIKI_BASE_PATH, './languages/shellscript.tmLanguage.json')

const xcmd = () => {
  __X_THEMES.forEach((t) => {
    const themePath = resolve(__SHIKI_BASE_PATH, `./themes/${t.name}.json`)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const theme = require(themePath)
    theme.tokenColors.push(
      {
        scope: 'support.function.x-cmd.main',
        settings: {
          foreground: t.main,
        },
      },
      {
        scope: 'support.function.x-cmd.subcmd',
        settings: {
          foreground: t.subcmd,
        },
      },
      {
        scope: 'support.function.x-cmd.synopsis',
        settings: {
          foreground: t.synopsis,
        },
      },
    )
    fs.writeFileSync(resolve(themePath), JSON.stringify(theme), 'utf-8')
  })

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const data = require(__SHIKI_SHELL_PATH)

  data.repository.support.patterns.push(
    {
      match: '(?<=^|\\s)(x|\\|\\sx)(?=\\s)',
      name: 'support.function.x-cmd.main',
    },
    {
      match: '(?<=^x|\\sx)\\s([a-zA-Z1-9_\\|]+[\\-]*[a-zA-Z1-9_\\|]*)',
      name: 'support.function.x-cmd.subcmd',
    },
    {
      match: '\\s\\[OPTIONS\\]|\\s\\[FLAGS\\]',
      name: 'support.function.x-cmd.synopsis',
    },
    {
      begin: '\\s*((<|\\[)\\#[0-9n])',
      beginCaptures: {
        0: {
          name: 'support.function.x-cmd.synopsis',
        },
      },
      end: '>|\\]',
      endCaptures: {
        0: {
          name: 'support.function.x-cmd.synopsis',
        },
      },
      name: 'support.function.x-cmd.synopsis',
      // patterns: [
      //   {
      //     include: '#string',
      //   },
      // ],
    },
  )
  fs.writeFileSync(resolve(__SHIKI_SHELL_PATH), JSON.stringify(data), 'utf-8')
}

const node = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const data = require(__SHIKI_SHELL_PATH)
  data.repository.support.patterns.push(
    {
      match: '(?<=^|;|&|\\s)(?:npm|npx|yarn|pnpm|bun|brew|git)',
      name: 'keyword',
    },
    {
      match: '(?<=^|;|&|\\s)(?:install -g|install -D|add -D|install)',
      name: 'string',
    },
    {
      match: '(?<=^)(cz-git|czg)',
      name: 'keyword',
    },
    {
      match: '(?<=^|;|&|\\s)(?:cz-git|czg|commitizen)',
      name: 'support.class',
    },
  )
  fs.writeFileSync(resolve(__SHIKI_SHELL_PATH), JSON.stringify(data), 'utf-8')
}

(async function () {
  /* eslint-disable no-console */
  const start = new Date().getTime()
  console.log('\x1B[90m[build-prepare] \x1B[33mEnhanceSyntax Highlight ...\x1B[0m')
  node()
  xcmd()
  console.log('\x1B[32m✓\x1B[0m Enhance Syntax Highlight')
  console.log(`  \x1B[90mEnhance Syntax Highlight in ${((Date.now() - start) / 1000).toFixed(2)}s\x1B[0m\n`)
}()).catch((err: Error) => {
  console.error(err)
  process.exit(1)
})
