import { unified } from '@astrojs/markdown-remark'
import Sitemap from '@astrojs/sitemap'
import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import ViteRestart from 'vite-plugin-restart'
import { rehypePlugins, remarkPlugins } from './src/lib/markdown'
import injectAfterHeadEl from './src/lib/server/injectAfterHeadEl'
import injectBeforeHeadEl from './src/lib/server/injectBeforeHeadEl'
import vitePWAOptions from './src/lib/server/pwa'
import Meta from './src/meta'

export default defineConfig({
    site: Meta.site,
    build: {
        /**
         * I turn on:
         *   - netlify `pretty_urls`
         *   - vercel  `cleanUrls`
         * If not. Plz using default and move file src/pages/posts.astro - src/pages/posts/index.astro
         */
        format: 'preserve',
    },
    integrations: [
        UnoCSS(),
        AstroPWA(vitePWAOptions),
        Sitemap(),
        injectBeforeHeadEl(),
        injectAfterHeadEl(),
    ],
    vite: {
        build: { cssCodeSplit: false },
        plugins: [ViteRestart({
            reload: [],
            restart: [
                './src/main.ts',
                './src/lib/markdown/**/*.ts',
                './src/lib/client/head/**/*.ts',
            ],
        })],
        optimizeDeps: { exclude: ['@resvg/resvg-js'] },
    },
    prefetch: {
        defaultStrategy: 'viewport',
        prefetchAll: true,
    },
    markdown: {
        shikiConfig: {
            theme: 'vitesse-dark',
            wrap: true,
        },
        processor: unified({
            remarkPlugins,
            rehypePlugins,
        }),
    },
})
