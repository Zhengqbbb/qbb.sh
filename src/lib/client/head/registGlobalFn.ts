/**
 * For: src/components/BaseHead.astro | id-script: regist-global-fn
 * Register global functions in advance before loading:
 *    - Image onLoad  callback Fn  - <img onload="window?.cImageOnLoad.call(this)" >
 *    - Image onError callback Fn  - <img onerror="window?.cImageOnError.call(this)" >
 *
 * Repalce the script by command:
 * @cli
pnpm esbuild ./src/lib/client/head/registGlobalFn.ts --bundle --target=es5 --banner:js='<script id="regist-global-fn" is:inline>' --footer:js='</script>' --minify
 */

window.cImageOnLoad = function (this: HTMLElement) {
    this.classList.remove('op-0', 'image-unloaded')
    this.removeAttribute('loading')
    this?.parentElement?.classList.remove('before:content-empty')
}

window.cImageOnError = function (this: HTMLElement) {
    this?.parentElement?.classList.add('error')
}
