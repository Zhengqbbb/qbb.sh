/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare global {
    namespace astroHTML.JSX {
        interface HTMLAttributes extends AttributifyAttributes {
            xl2?: string
            xl3?: string
            xl4?: string
            from?: string
            via?: string
            to?: string
            decoration?: string
        }
    }

    interface Window {
        isDark: boolean
        toggleTheme: () => void
        /** support for removeEventListener */
        headerScrollHandler: () => void
    }
}
