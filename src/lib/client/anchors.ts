export function navigate() {
    if (location.hash) {
        const el = document.querySelector(decodeURIComponent(location.hash))
        if (!el)
            return
        const top = el.getBoundingClientRect().top
        const offset = window.scrollY
        window.scrollTo({
            top: top + offset - 80,
            behavior: 'smooth',
        })
    }
}

export function handleAnchors(event: Event) {
    const evt = event as MouseEvent & { target: HTMLElement }
    const link = evt.target.closest('a')

    if (
        !evt.defaultPrevented
        && link
        && evt.button === 0
        && link.target !== '_blank'
        && link.rel !== 'external'
        && !link.download
        && !evt.metaKey
        && !evt.ctrlKey
        && !evt.shiftKey
        && !evt.altKey
    ) {
        const url = new URL(link.href)
        if (url.origin !== window.location.origin)
            return

        evt.preventDefault()
        const { pathname, hash } = url
        if (hash && (!pathname || pathname === location.pathname)) {
            window.history.replaceState({}, '', hash)
            navigate()
        }
        else {
            window.location.href = pathname + hash
        }
    }
}
