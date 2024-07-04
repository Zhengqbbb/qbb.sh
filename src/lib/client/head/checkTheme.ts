/* eslint-disable no-var */
/**
 * For: src/components/BaseHead.astro | id-script: check-dark-mode
 * Prevent page from blinking in dark mode
 * Is inline script handle by ownerself
 * Need using ES5 target for this file. Because of the type=module not will execute immediately
 *
 * Repalce the script by command:
 * @cli
pnpm esbuild ./src/lib/client/head/checkTheme.ts --bundle --target=es5 --banner:js='<script id="check-dark-mode" is:inline>' --footer:js='</script>' --minify
 */

(() => {
    var prefersDark = window?.matchMedia('(prefers-color-scheme: dark)').matches
    var preference = localStorage.getItem('theme-scheme') || 'auto'
    if (preference === 'dark' || (preference !== 'light' && prefersDark)) {
        document.documentElement.classList.add('dark')
        window.isDark = true
    }
    else {
        // pre set theme-color for PWA phone application. Prevent blinking
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', '#ffffff')
    }
})()
