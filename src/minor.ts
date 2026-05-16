/**
 * The minor entry point for:
 * - Provide page extra features
 * - Enhance page interaction
 */

import mediumZoom from 'medium-zoom'
import { registerSW } from 'virtual:pwa-register'
import { handleAnchors, injectGiscusEl } from '~/lib/client'

// 仅生产注册 SW，避免 dev 下 SW 缓存/拦截导致白屏或陈旧资源
if (import.meta.env.PROD)
    registerSW({ immediate: true })

// inject medium-zoom
const zoom = mediumZoom()
zoom.attach('.prose :not(a) > img:not(.no-zoom)')

// inject header anchor handler
const content = document.querySelector('.prose.post')
content?.addEventListener('click', handleAnchors, { passive: false })

// inject Giscus
if (document.getElementById('giscus'))
    injectGiscusEl()
