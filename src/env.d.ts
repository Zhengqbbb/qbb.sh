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
        }
    }

    interface ImportMetaEnv {
        /** Add Before Head Element By injectBeforeHeadEl.ts Integration */
        readonly INJECT_BEFORE_HEAD_INLINE_SCRIPT: string
        /** Add Aftre Head Element By injectAfterHeadEl.ts Integration */
        readonly INJECT_AFTRE_HEAD_INLINE_SCRIPT: string
        /** Prod env with additional elements of the head, such as site tracking code */
        readonly HEAD_INJECT: string
    }
    interface ImportMeta {
        readonly env: ImportMetaEnv
    }

    declare namespace NodeJS {
        interface ProcessEnv {
            /** Add Before Head Element By injectBeforeHeadEl.ts Integration */
            INJECT_BEFORE_HEAD_INLINE_SCRIPT: string
            /** Add Aftre Head Element By injectAfterHeadEl.ts Integration */
            INJECT_AFTRE_HEAD_INLINE_SCRIPT: string
        }
    }
}
