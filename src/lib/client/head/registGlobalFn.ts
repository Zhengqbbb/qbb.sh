/**
 * For: src/components/BaseHead.astro | id-script: regist-global-fn
 * Register global functions in advance before loading:
 *    - Image onLoad  callback Fn  - <img onload="window?.cImageOnLoad.call(this)" >
 *    - Image onError callback Fn  - <img onerror="window?.cImageOnError.call(this)" >
 *
 * Will using 'src/lib/server/injectBeforeHeadEl.ts' Integration to inject the script
 */
/* @unocss-include */

window.cImageOnLoad = function (this: HTMLElement) {
    this.classList.remove('op-0', 'image-unloaded')
    // remove loading=lazy attr. Avoid medium-zoom no-cache reload image in ios phone
    this.removeAttribute('loading')
    this?.parentElement?.classList.remove('before:content-empty')
    setTimeout(() => {
        this.classList.remove('image-loaded')
        this.removeAttribute('onload')
        this.removeAttribute('onerror')
    }, 400)
}

window.cImageOnError = function (this: HTMLElement) {
    this?.parentElement?.classList.add('error')
}
