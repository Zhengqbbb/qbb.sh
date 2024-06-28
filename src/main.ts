import { loadRemoteCDNs } from '~/lib/client/cdn'
import { injectGiscusEl, toggleGiscusTheme } from '~/lib/client/giscus'

// #region - Appearance Theme
window.toggleTheme = () => {
    const element = document.documentElement
    element.classList.toggle('dark')
    const isDark = element.classList.contains('dark')
    window.isDark = isDark
    localStorage.setItem('theme-scheme', isDark ? 'dark' : 'light')
}

document
    ?.getElementById('theme-toggle')
    ?.addEventListener('click', window.toggleTheme)
// #endregion

// #region - Header Sticky
/* @unocss-include */
/* astro will bundle and create inline script, the unocss not will be include style, need to using `content.filesystem` uno.config.ts */
const stickyClasses = ['fixed', 'h-[calc(var(--c-nav-hight)-24px)]']
const unstickyClasses = ['absolute', 'h-$c-nav-hight']
const stickyClassesContainer = [
    'bg-white:80',
    'dark:bg-neutral-900:60',
    'border-c-border:80',
    'backdrop-blur-2xl',
    'shadow-sm',
]
const unstickyClassesContainer = ['border-transparent']

function handleHeaderElementScrollCB(el: HTMLElement) {
    if (window.scrollY > 15) {
        el.firstElementChild?.classList.add(...stickyClassesContainer)
        el.firstElementChild?.classList.remove(...unstickyClassesContainer)
        el.classList.add(...stickyClasses)
        el.classList.remove(...unstickyClasses)
    }
    else {
        el.firstElementChild?.classList.remove(...stickyClassesContainer)
        el.firstElementChild?.classList.add(...unstickyClassesContainer)
        el.classList.add(...unstickyClasses)
        el.classList.remove(...stickyClasses)
    }
}
// #endregion

// #region - Medium-Zoom
export async function mediumZoomLoader() {
    if (typeof window.mediumZoom === 'function')
        return window.mediumZoom

    // main loader
    await loadRemoteCDNs(
        'https://unpkg.com/medium-zoom@1.1.0/dist/medium-zoom.min.js',
        'https://registry.npmmirror.com/medium-zoom/1.1.0/files/dist/medium-zoom.min.js',
        'js',
    )

    if (!window?.mediumZoom) {
        console.error('mediumZoom not found')
        return null
    }

    return window.mediumZoom
}

async function attachMediumZoom(selectors = '.prose :not(a) > img:not(.not-zoom)') {
    const mediumZoom = await mediumZoomLoader()
    if (!mediumZoom)
        return
    mediumZoom(selectors)
}
// #endregion

document.addEventListener('DOMContentLoaded', async () => {
    // Add Theme Change Observer
    const themeChangeObs = new MutationObserver(() => {
        const themeColorHeadMeta = document.querySelector('meta[name="theme-color"]')
        if (themeColorHeadMeta)
            themeColorHeadMeta.setAttribute('content', window.isDark ? '#0a0a0a' : '#ffffff')
        if (document.getElementById('giscus'))
            toggleGiscusTheme(window.isDark)
    })

    themeChangeObs.observe(
        document.documentElement,
        { attributes: true, attributeFilter: ['class'] },
    )

    // Handle Header Sticky
    const headerEl = document.getElementById('header')
    if (headerEl) {
        handleHeaderElementScrollCB(headerEl)
        window.headerScrollHandler = handleHeaderElementScrollCB.bind(null, headerEl)
        window.addEventListener('scroll', window.headerScrollHandler)
    }

    // Home Page
    const avatarEl = document.getElementById('home-avatar')
    if (avatarEl) {
        const avatar = new Image()
        avatar.src = '/me.webp'
        avatar.onload = () => avatarEl.classList.add('loaded')
    }
    else {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = '/me.webp'
        link.as = 'image'
        document.head.appendChild(link)
    }

    // Inject Giscus
    const giscusEl = document.getElementById('giscus')
    if (giscusEl)
        injectGiscusEl()

    // Main CDN Loader
    Promise.all([
        attachMediumZoom(),
    ])
})
