// astro.config.ts
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import AstroPWA from '@vite-pwa/astro'
import Sitemap from '@astrojs/sitemap'
import ViteRestart from 'vite-plugin-restart'
import Meta from './src/meta'
import vitePWAOptions from './src/lib/server/pwa'
import { rehypePlugins, remarkPlugins } from './src/lib/markdown'

export default defineConfig({
    site: Meta.site,
    integrations: [
        UnoCSS({ injectReset: true }),
        AstroPWA(vitePWAOptions),
        Sitemap(),
    ],
    vite: {
        build: { cssCodeSplit: false },
        plugins: [ViteRestart({
            reload: ['./src/lib/client/main.js'],
            restart: ['./src/lib/markdown/**/*.ts'],
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
        remarkPlugins,
        rehypePlugins,
    },
})
