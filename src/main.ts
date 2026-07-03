/**
 * Inline module script injected by injectAfterHeadEl.ts.
 * Runs once — ClientRouter does not re-execute inline scripts.
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
// #endregion

// #region - Header Sticky
/* @unocss-include */
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

// #region - Page Background & Avatar
let bgGradientTimer: ReturnType<typeof setInterval> | null = null

function initBgGradient() {
    if (bgGradientTimer) {
        clearInterval(bgGradientTimer)
        bgGradientTimer = null
    }
    const bgUnGradient = document.getElementById('bg-un-gradient')
    if (!bgUnGradient?.style?.cssText)
        return

    let op = 0.6
    let blur = 1
    const initial = { op, blur }
    const transitionTime = 500
    const transitionStep = 10
    bgGradientTimer = setInterval(() => {
        if (op >= 1) {
            clearInterval(bgGradientTimer!)
            bgGradientTimer = null
            bgUnGradient.style.cssText
                = `--bg-un-gradient: hsl(var(--c-bg)) 50%, transparent 90%, transparent 100%; filter: blur(0); z-index: -1;`
        }
        else {
            bgUnGradient.style.cssText
                = `--bg-un-gradient: hsl(var(--c-bg) / ${op}) 50%, transparent 90%, transparent 100%; filter: blur(${blur}px); z-index: -1;`
        }
        op += ((1 - initial.op) * transitionStep) / transitionTime
        blur += ((0 - initial.blur) * transitionStep) / transitionTime
    }, transitionStep)
}

function initAvatar() {
    const avatarEl = document.getElementById('home-avatar') as HTMLImageElement
    if (!avatarEl)
        return

    const avatar = new Image()
    avatar.src = avatarEl.src
    avatar.onload = () => avatarEl.classList.add('loaded')
}
// #endregion

// #region - Per-navigation init
function initPerPage() {
    document
        .getElementById('theme-toggle')
        ?.addEventListener('click', window.toggleTheme)

    if (window.headerScrollHandler)
        window.removeEventListener('scroll', window.headerScrollHandler)

    const headerEl = document.getElementById('header')
    if (headerEl) {
        handleHeaderElementScrollCB(headerEl)
        window.headerScrollHandler = handleHeaderElementScrollCB.bind(null, headerEl)
        window.addEventListener('scroll', window.headerScrollHandler)
    }

    if (window.location.hash)
        setTimeout(navigate)

    initBgGradient()
    initAvatar()
}
// #endregion

// Created once, persists across navigations
const themeChangeObs = new MutationObserver(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta)
        meta.setAttribute('content', window.isDark ? '#0a0a0a' : '#ffffff')
    if (document.getElementById('giscus'))
        toggleGiscusTheme(window.isDark)
})
themeChangeObs.observe(
    document.documentElement,
    { attributes: true, attributeFilter: ['class'] },
)

initPerPage()
document.addEventListener('astro:after-swap', initPerPage)
