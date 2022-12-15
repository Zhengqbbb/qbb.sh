import { resolve } from 'pathe'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown from 'vite-plugin-vue-markdown'
import { VitePWA } from 'vite-plugin-pwa'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  registerMarkdownPlugins,
  resolvePageFile,
  resolvePostList,
  vitePWAOptions,
} from './build'

export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
      { find: '~build/', replacement: `${resolve(__dirname, 'build')}/` },
    ],
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },

  plugins: [
    UnoCSS(),
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),
    Jsx(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      pagesDir: 'pages',
      extensions: ['vue', 'md'],
      extendRoute: route => resolvePageFile(route),
      onRoutesGenerated: routes => resolvePostList(routes),
    }),
    // https://github.com/antfu/vite-plugin-vue-markdown
    Markdown({
      wrapperClasses: 'prose m-auto',
      headEnabled: false,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup: md => registerMarkdownPlugins(md),
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
      ],
      vueTemplate: true,
      dirs: [
        'src/composables',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    // https://github.com/antfu/unplugin-vue-components#usage && https://github.com/johnsoncodehk/volar/discussions/471
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: 'src/components',
      dts: 'src/components.d.ts',
    }),
    VitePWA(vitePWAOptions),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    format: 'cjs',
  },
})
