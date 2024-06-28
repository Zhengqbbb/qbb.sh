export function loadRemoteCDN(src: string, type: 'js' | 'css' = 'js') {
    return new Promise((resolve, reject) => {
        if (type === 'js') {
            const script = document.createElement('script')
            script.src = src
            script.async = true
            script.onload = () => resolve(true)
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
            document.head.appendChild(script)
        }
        else if (type === 'css') {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = src
            link.onload = () => resolve(true)
            link.onerror = () => reject(new Error(`Failed to load style: ${src}`))
            document.head.appendChild(link)
        }
    })
}

/** The CDN script loaded and Add Obj to window */
export async function loadRemoteCDNs(mainSrc: string, backupSrc: string, type: 'js' | 'css' = 'js') {
    try {
        type === 'js'
            ? await loadRemoteCDN(mainSrc, 'js')
            : await loadRemoteCDN(mainSrc, 'css')
    }
    catch {
        try {
            type === 'js'
                ? await loadRemoteCDN(backupSrc, 'js')
                : await loadRemoteCDN(backupSrc, 'css')
        }
        catch (error) {
            console.error('The remote CDN scripts load error:', error)
        }
    }
}
