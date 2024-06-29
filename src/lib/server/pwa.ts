import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { VitePWAOptions } from 'vite-plugin-pwa'
import fg from 'fast-glob'
import { resolve } from 'pathe'

/* eslint-disable prefer-regex-literals */
const STATIC_REOMTE_ASSETS = {
    'google-font-cache': new RegExp('^https://fonts.googleapis.com/.*', 'i'),
    'google-static-font-cache': new RegExp('^https://fonts.gstatic.com/.*', 'i'),
    'unpkg-cdn-cache': new RegExp('^https://unpkg.com/.*', 'i'),
    'jsdelivr-cdn-cache': new RegExp('^https://cdn.jsdelivr.net/.*', 'i'),
    'npmmirror-cdn-cache': new RegExp('^https://registry.npmmirror.com/.*', 'i'),
    'github-static-cache': new RegExp('^https://(((raw|user-images|camo).githubusercontent.com))/.*', 'i'),
}

/**
 * Vite Plugin PWA uses Workbox  library to build the service worker
 * can find more information on Workbox section.
 * @see https://vite-pwa-org.netlify.app/frameworks/astro
 */
export default {
    registerType: 'autoUpdate',
    includeAssets: fg.sync(
        '**/*.{webp,png,jpg,svg,gif,ico,txt,woff2}',
        { cwd: resolve(dirname(fileURLToPath(import.meta.url)), '../../public') },
    ),
    manifest: {
        name: 'Q.Ben',
        short_name: 'Q.Ben',
        theme_color: '#0a0a0a',
        icons: [
            {
                src: '/icon/apple-touch-120x120.png',
                sizes: '120x120',
                type: 'image/png',
            },
            {
                src: '/pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/logo-light.svg',
                sizes: '165x165',
                type: 'image/svg',
                purpose: 'any maskable',
            },
        ],
    },
    workbox: {
        navigateFallbackDenylist: [/^\/new/],
        globPatterns: ['**/*.{js,css,webp,png,svg,gif,mp4,ico,woff2}'],
        navigateFallback: '/404',
        mode: 'production',
        runtimeCaching: [
            ...Object
                .entries(STATIC_REOMTE_ASSETS)
                .map(([cacheName, regex]) => ({
                    urlPattern: regex,
                    handler: 'CacheFirst',
                    options: {
                        cacheName,
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                })),
        ],
    },
} as Partial<VitePWAOptions>
