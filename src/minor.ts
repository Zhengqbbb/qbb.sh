/**
 * The minor entry point for:
 * - Provide page extra features
 * - Enhance page interaction
 */

import { registerSW } from 'virtual:pwa-register'
import mediumZoom from 'medium-zoom'
import { handleAnchors, injectGiscusEl } from '~/lib/client'

// register the service worker - PWA
registerSW({ immediate: true })

// inject medium-zoom
const zoom = mediumZoom()
zoom.attach('.prose :not(a) > img:not(.no-zoom)')

// inject header anchor handler
const content = document.querySelector('.prose.post')
content?.addEventListener('click', handleAnchors, { passive: false })

// inject Giscus
!!document.getElementById('giscus') && injectGiscusEl()
