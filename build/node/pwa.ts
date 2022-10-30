import type { VitePWAOptions } from 'vite-plugin-pwa'
import fg from 'fast-glob'
import { resolve } from 'pathe'

/* eslint-disable prefer-regex-literals */
const __GITHUB_SOURCE_CONTENT_REGEX = new RegExp('^https://(((raw|user-images|camo).githubusercontent.com))/.*', 'i')
const __GSTATIC_FONTS_REGEX = new RegExp('^https://fonts.gstatic.com/.*', 'i')
const __JSDELIVR_CDN_REGEX = new RegExp('^https://cdn.jsdelivr.net/.*', 'i')

/**
 * Vite Plugin PWA uses Workbox  library to build the service worker
 * can find more information on Workbox section.
 * @see https://vite-plugin-pwa.netlify.app/
 */
export const vitePWAOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: fg.sync('**/*.{png,jpeg,jpg,svg,gif,ico,txt,woff2}', { cwd: resolve(__dirname, '../../public') }),
  manifest: {
    name: 'Q.Ben',
    short_name: 'Q.Ben',
    theme_color: '#050505',
    icons: [
      {
        src: '/icons/apple-touch-120x120.png',
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
    globPatterns: ['**/*.{html,js,css,png,svg,gif,ico,woff2}'],
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /index\.html/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'domain-page-cache',
          networkTimeoutSeconds: 5,
        },
      },
      {
        urlPattern: __GSTATIC_FONTS_REGEX,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: __GSTATIC_FONTS_REGEX,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: __JSDELIVR_CDN_REGEX,
        handler: 'CacheFirst',
        options: {
          cacheName: 'jsdelivr-cdn-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: __GITHUB_SOURCE_CONTENT_REGEX,
        handler: 'CacheFirst',
        options: {
          cacheName: 'githubusercontent-images-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}
