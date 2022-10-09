import { resolve } from 'pathe'
import { defineConfig } from 'vite'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown from 'vite-plugin-vue-markdown'
import UnoCSS from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'
import {
  autoImportPlugin,
  componentsPlugin,
  pagesPlugin,
  pwaPlugin,
  registerMarkdownPlugins,
  vuePlugin,
} from './build'

export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },

  plugins: [
    UnoCSS(),
    vuePlugin,
    pagesPlugin,
    autoImportPlugin,
    componentsPlugin,
    pwaPlugin,

    /** @see https://github.com/JohnCampionJr/vite-plugin-vue-layouts */
    Layouts(),

    /** @see https://github.com/antfu/vite-plugin-inspect || @see http://localhost:3333/__inspect/ */
    Inspect(),

    /** @see https://github.com/antfu/vite-plugin-vue-markdown */
    Markdown({
      wrapperClasses: 'prose m-auto',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup: md => registerMarkdownPlugins(md),
    }),
  ],

  /** @see https://github.com/antfu/vite-ssg */
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    format: 'cjs',
    onFinished() {
      generateSitemap({
        hostname: 'https://www.qbb.sh',
      })
    },
  },
})
