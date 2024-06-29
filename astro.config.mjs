// astro.config.ts
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import AstroPWA from '@vite-pwa/astro'
import Meta from './src/meta'
import vitePWAOptions from './src/lib/server/pwa'
import { rehypePlugins, remarkPlugins } from './src/lib/markdown'

export default defineConfig({
    site: Meta.site,
    integrations: [
        UnoCSS({ injectReset: true }),
        /** Add PWA for enforcing caching of CDN fonts and static resources  */
        AstroPWA(vitePWAOptions),
    ],
    vite: {
        build: { cssCodeSplit: false },
        server: {
            warmup: {
                clientFiles: ['./src/lib/client/main.js'],
            },
        },
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
