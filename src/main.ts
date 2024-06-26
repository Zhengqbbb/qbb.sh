/* @unocss-include */

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
const stickyClasses = ['fixed', 'h-[calc(var(--c-nav-hight)-24px)]']
const unstickyClasses = ['absolute', 'h-$c-nav-hight']
const stickyClassesContainer = [
    'bg-white:80',
    'dark:bg-neutral-900:98',
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

document.addEventListener('DOMContentLoaded', () => {
    // Add Theme Change Observer
    const themeChangeObs = new MutationObserver(() => {
        const themeColorMeta = document.querySelector('meta[name="theme-color"]')
        if (themeColorMeta)
            themeColorMeta.setAttribute('content', window.isDark ? '#121212' : '#ffffff')
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
})
