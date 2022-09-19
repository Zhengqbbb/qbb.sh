import { VitePWA } from 'vite-plugin-pwa'
import fg from 'fast-glob'
import { resolve } from 'pathe'

// eslint-disable-next-line prefer-regex-literals
const __GITHUB_SOURCE_CONTENT_REGEX = new RegExp('^https://(((raw|user-images|camo).githubusercontent.com))/.*', 'i')
/**
 * Vite Plugin PWA uses Workbox  library to build the service worker
 * can find more information on Workbox section.
 * @see https://vite-plugin-pwa.netlify.app/
 */
export const pwaPlugin = VitePWA({
  registerType: 'autoUpdate',
  includeAssets: fg.sync('**/*.{png,svg,gif,ico,txt}', { cwd: resolve(__dirname, '../../public') }),
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
        src: '/logo-dark.svg',
        sizes: '165x165',
        type: 'image/svg',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    navigateFallbackDenylist: [/^\/new$/],
    globPatterns: ['**/*.{css,js,html,png,svg,gif,ico,woff2}'],
    runtimeCaching: [
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
})
