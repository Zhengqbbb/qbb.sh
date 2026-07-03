/* eslint-disable no-var */
/**
 * For: src/components/BaseHead.astro | id-script: check-dark-mode
 * Prevent page from blinking in dark mode
 * Is inline script handle by ownerself
 * Need using ES5 target for this file. Because of the type=module not will execute immediately
 *
 * Will using 'src/lib/server/injectBeforeHeadEl.ts' Integration to inject the script
 */

;(() => {
    function applyTheme() {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        var preference = localStorage.getItem('theme-scheme') || 'auto'
        if (preference === 'dark' || (preference !== 'light' && prefersDark)) {
            document.documentElement.classList.add('dark')
            window.isDark = true
        }
        else {
            document.documentElement.classList.remove('dark')
            window.isDark = false
            // pre set theme-color for PWA phone application. Prevent blinking
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute('content', '#ffffff')
        }
    }

    applyTheme()

    // ClientRouter: inline scripts don't re-execute, re-apply theme after swap
    document.addEventListener('astro:after-swap', applyTheme)
})()
