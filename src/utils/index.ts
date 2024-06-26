export const inBrowser = typeof document !== 'undefined'

export const HASH_RE = /#.*$/

export const HASH_OR_QUERY_RE = /[?#].*$/

export function escapeHtml(str: string) {
    return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/&(?![\w#]+;)/g, '&amp;')
}

export function isExternal(path: string) {
    const outboundRE = /^(?:https?:|mailto:|tel:)/
    return outboundRE.test(path)
}
