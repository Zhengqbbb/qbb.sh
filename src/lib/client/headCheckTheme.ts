/* eslint-disable no-var */
/**
 * For: src/components/BaseHead.astro | id-script: check-dark-mode
 * Prevent page from blinking in dark mode
 * Is inline script handle by ownerself
 * Need using ES5 target for this file
 *
 * Repalce the script by command:
 * @cli pnpm esbuild ./src/lib/client/headCheckTheme.ts --bundle --minify --target=es5
 */

(() => {
    var prefersDark = window?.matchMedia('(prefers-color-scheme: dark)').matches
    var preference = localStorage.getItem('theme-scheme') || 'auto'
    if (preference === 'dark' || (preference !== 'light' && prefersDark)) {
        document.documentElement.classList.add('dark')
        window.isDark = true
    }
    else {
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', '#ffffff')
    }
})()
