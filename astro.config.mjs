import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import AstroPWA from '@vite-pwa/astro'
import Sitemap from '@astrojs/sitemap'
import ViteRestart from 'vite-plugin-restart'
import Meta from './src/meta'
import vitePWAOptions from './src/lib/server/pwa'
import injectBeforeHeadEl from './src/lib/server/injectBeforeHeadEl'
import injectAfterHeadEl from './src/lib/server/injectAfterHeadEl'
import { rehypePlugins, remarkPlugins } from './src/lib/markdown'

export default defineConfig({
    site: Meta.site,
    build: {
        /**
         * I turn on:
         *   - netlify `pretty_urls`
         *   - vercel `cleanUrls`
         * If not. Plz using default and move file src/pages/posts.astro - src/pages/posts/index.astro
         */
        format: 'preserve',
    },
    integrations: [
        UnoCSS({ injectReset: true }),
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
        remarkPlugins,
        rehypePlugins,
    },
})
