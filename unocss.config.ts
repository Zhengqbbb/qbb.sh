import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

/**
 * The instant on-demand Atomic CSS engine.
 * @see https://uno.antfu.me/
 */
export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block text-white cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['border-c', 'border-gray-200 dark:border-coolgray-700'],
    ['nav-divider', 'w-1px h-18px bg-gray-200 dark:bg-coolgray-700'],
  ],
  theme: {
    fontFamily: {
      sans: '"Inter", Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    },
    colors: {
      brand: 'rgba(76, 148, 200)',
    },
  },
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto'.split(' '),
})
