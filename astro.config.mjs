// astro.config.ts
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import Meta from './src/meta'

export default defineConfig({
    site: Meta.site,
    integrations: [
        UnoCSS({ injectReset: true }),
    ],
    prefetch: {
        defaultStrategy: 'viewport',
        prefetchAll: true,
    },
})
