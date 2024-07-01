/**
 * The main entry point inline script handle
 * Astro does not support handle the inline script
 * So the ts file have to handle it manually by esbuild
 */
import { navigate, toggleGiscusTheme } from '~/lib/client'

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
/* astro will bundle and create inline script
 * the unocss not will be include style,
 * need to using `content.filesystem` uno.config.ts
 */
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

    // Handle Page Enter with Hash
    !!window.location.hash && setTimeout(navigate)

    // Home Page Preload
    const avatarEl = document.getElementById('home-avatar')
    if (avatarEl) {
        const avatar = new Image()
        avatar.src = '/me.webp?v=240630'
        avatar.onload = () => avatarEl.classList.add('loaded')
    }
    else {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = '/me.webp?v=240630'
        link.as = 'image'
        document.head.appendChild(link)
    }
})
