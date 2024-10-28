import type { VitePWAOptions } from 'vite-plugin-pwa'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import { resolve } from 'pathe'
import Meta from '../../meta'

/* eslint-disable prefer-regex-literals */
const STATIC_REMOTE_ASSETS = {
    // 'local-font-cache': new RegExp('\\.woff2$', 'i'),
    'static-cache': new RegExp(`^${Meta.cdnUrl}/.*`, 'i'),
    'google-font-cache': new RegExp('^https://fonts.googleapis.com/.*', 'i'),
    'google-static-font-cache': new RegExp('^https://fonts.gstatic.com/.*', 'i'),
    'unpkg-cdn-cache': new RegExp('^https://unpkg.com/.*', 'i'),
    'jsdelivr-cdn-cache': new RegExp('^https://cdn.jsdelivr.net/.*', 'i'),
    'npmmirror-cdn-cache': new RegExp('^https://registry.npmmirror.com/.*', 'i'),
    'github-static-cache': new RegExp('^https://(((raw|user-images|camo).githubusercontent.com))/.*', 'i'),
}

const PWA_ASSETS = [
    '**/*.{js,css,ico}',
    'logo-*.svg',
    'pwa-*.png',
]

/**
 * Vite Plugin PWA uses Workbox  library to build the service worker
 * can find more information on Workbox section.
 * @see https://vite-pwa-org.netlify.app/frameworks/astro
 */
/** Add PWA for enforcing caching of CDN fonts and static resources  */
export default {
    mode: 'development',
    base: '/',
    scope: '/',
    registerType: 'autoUpdate',
    includeAssets: fg.sync(
        PWA_ASSETS,
        { cwd: resolve(dirname(fileURLToPath(import.meta.url)), '../../public') },
    ),
    manifest: {
        name: Meta.appName,
        short_name: Meta.appName,
        description: Meta.description,
        theme_color: '#0a0a0a',
        icons: [
            {
                src: '/apple-touch-120x120.png',
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
        mode: 'production',
        navigateFallbackDenylist: [],
        navigateFallback: null,
        globPatterns: PWA_ASSETS,
        runtimeCaching: [
            ...Object
                .entries(STATIC_REMOTE_ASSETS)
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
