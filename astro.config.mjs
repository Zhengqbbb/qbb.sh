// astro.config.ts
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import AstroPWA from '@vite-pwa/astro'
import Meta from './src/meta'
import vitePWAOptions from './src/lib/server/pwa'

export default defineConfig({
    site: Meta.site,
    integrations: [
        UnoCSS({ injectReset: true }),
        /** Add PWA for enforcing caching of CDN fonts and static resources  */
        AstroPWA({
            mode: 'development',
            base: '/',
            scope: '/',
            ...vitePWAOptions,
        }),
    ],
    prefetch: {
        defaultStrategy: 'viewport',
        prefetchAll: true,
    },
})
