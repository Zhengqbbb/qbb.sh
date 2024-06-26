/// <reference types="astro/client" />

import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare global {
    namespace astroHTML.JSX {
        interface HTMLAttributes extends AttributifyAttributes {
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
