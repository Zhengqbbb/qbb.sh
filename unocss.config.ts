import {
  defineConfig,
  presetAttributify, presetIcons, presetUno, presetWebFonts,
  transformerDirectives, transformerVariantGroup,
} from 'unocss'
import type { Theme } from 'unocss/preset-mini'

/**
 * The instant on-demand Atomic CSS engine.
 * @see https://uno.antfu.me/
 */
export const _VARS: Theme = {
  colors: {
    l: {
      bg: 'rgb(255, 255, 255)',
      fg: 'rgb(85, 85, 85)',
      fgDeep: 'rgb(34, 34, 34)',
      fgDeeper: 'rgb(0, 0, 0)',
      dim: 'rgb(75, 85, 99)',
      border: 'rgba(125, 125, 125, 0.3)',
      codeBG: 'rgb(248, 248, 248)',
      innerCodeBG: 'rgba(130, 146, 167, 0.1)',
    },
    d: {
      bg: 'rgb(5, 5, 5)',
      fg: 'rgb(178, 178, 178)',
      fgDeep: 'rgb(221, 221, 221)',
      fgDeeper: 'rgb(255, 255, 255)',
      dim: 'rgb(161, 161, 170)',
      border: 'rgba(125, 125, 125, 0.4)',
      codeBG: 'rgba(52, 52, 52, 0.5)',
      innerCodeBG: 'rgba(255, 255, 255, 0.1)',
    },
    brand: 'rgb(168, 191, 191)',
  },
  borderRadius: {
    DEFAULT: '0.325rem',
    sm: '0.25rem',
  },
  maxWidth: {
    content: '70ch',
  },
  spacing: {
    space: '1.2em',
  },
  fontFamily: {
    sans: '"Inter var experimental","Inter var","Inter",system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    mono: 'Menlo,"Noto Sans Mono","Fira Code","Fira Mono",ui-monospace,SFMono-Regular,"SF Mono",Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  },
}

/**
 * @description: gen bg color text merge light and dark mode color shortcuts
 * @example: ['bg-c-bg', 'bg-l-bg dark:bg-d-bg']
 */
const COLS = ['bg', 'text', 'border']
const mergeVarCols = () => {
  const res = Object.assign([])
  const lightMP: any = _VARS?.colors?.l
  for (const name in lightMP) {
    COLS.forEach((key) => {
      const item = [`${key}-c-${name}`]
      const val = [`${key}-l-${name}`]
      if (Object.prototype.hasOwnProperty.call(_VARS?.colors?.d, name))
        val.push(`dark:${key}-d-${name}`)
      item.push(val.join(' '))
      res.push(item)
    })
  }
  return res
}

export default defineConfig({
  theme: _VARS,
  rules: [],
  shortcuts: [
    ['nav-divider', 'w-1px h-18px bg-gray-200 dark:bg-coolgray-700'],
    ['text-c-nowrap', 'overflow-hidden whitespace-nowrap text-ellipsis'],
    ...mergeVarCols(),
  ],
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetAttributify(),
    presetUno(),
    presetWebFonts({
      fonts: {
        sans: ['Inter:400,600,800'],
        mono: 'Noto Sans Mono:500,700',
      },
      extendTheme: false,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto'.split(' '),
})
