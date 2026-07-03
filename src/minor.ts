import mediumZoom from 'medium-zoom/dist/pure'
import { registerSW } from 'virtual:pwa-register'
import { handleAnchors, injectGiscusEl } from '~/lib/client'

if (import.meta.env.PROD)
    registerSW({ immediate: true })

// function loadZoom() {
//     const target = '.prose :not(a) > img:not(.no-zoom)'
//     if (window.__zoom) {
//         window.__zoom.detach()
//         window.__zoom.attach(target)
//         return
//     }
//     window.__zoom = mediumZoom(target)
// }

function loadPage() {
    const zoom = mediumZoom()
    zoom.detach()
    zoom.attach('.prose :not(a) > img:not(.no-zoom)')

    const content = document.querySelector('.prose.post')
    content?.addEventListener('click', handleAnchors, { passive: false })

    if (document.getElementById('giscus'))
        injectGiscusEl()
}

loadPage()
document.addEventListener('astro:after-swap', loadPage)
