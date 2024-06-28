import { GISCUS } from '~/meta'

/** @see https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md */
export function injectGiscusEl() {
    const theme = window.isDark ? 'dark_protanopia' : 'light'
    const lang = document.documentElement.getAttribute('lang') === 'zh'
        ? 'zh-CN'
        : 'en'

    const element = document.createElement('script')
    element.setAttribute('src', 'https://giscus.app/client.js')
    element.setAttribute('async', 'true')
    element.setAttribute('crossorigin', 'anonymous')
    /** @types https://github.com/giscus/giscus/blob/main/lib/types/giscus.ts */
    element.setAttribute('data-repo', GISCUS.repo)
    element.setAttribute('data-repo-id', GISCUS.repoId)
    element.setAttribute('data-category', GISCUS.category)
    element.setAttribute('data-category-id', GISCUS.categoryId)
    element.setAttribute('data-theme', theme)
    element.setAttribute('data-lang', lang)
    element.setAttribute('data-mapping', 'pathname')
    element.setAttribute('data-input-position', 'top')
    element.setAttribute('data-reactions-enabled', '1')
    element.setAttribute('data-strict', '1')
    element.setAttribute('data-emit-metadata', '0')
    document.head.appendChild(element)
}

export function toggleGiscusTheme(isDark: boolean) {
    const theme = isDark ? 'dark_protanopia' : 'light'
    const iframe = document.querySelector<HTMLIFrameElement>(
        'iframe.giscus-frame',
    )
    iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        'https://giscus.app',
    )
}
