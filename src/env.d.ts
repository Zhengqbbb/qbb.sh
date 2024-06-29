/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { AttributifyAttributes } from '@unocss/preset-attributify'
import type mediumZoom from 'medium-zoom'

declare global {
    interface Window {
        isDark: boolean
        toggleTheme: () => void
        mediumZoom: typeof mediumZoom | undefined
        /** for support removeEventListener */
        headerScrollHandler: () => void
        /** Global image loaded CallBack Fn */
        cImageOnLoad: () => void
        cImageOnError: () => void
    }

    namespace astroHTML.JSX {
        interface HTMLAttributes extends AttributifyAttributes {
            xl2?: string
            xl3?: string
            xl4?: string
            from?: string
            via?: string
            to?: string
            decoration?: string
            dangerouslySetInnerHTML?: {
                __html?: string
            }
        }
    }
}
