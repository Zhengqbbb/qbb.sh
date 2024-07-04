import fs from 'node:fs'
import process from 'node:process'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { AstroIntegration } from 'astro'
import esbuild from 'esbuild'
import { resolve } from 'pathe'

export default function injectBeforeHeadEl(): AstroIntegration {
    return {
        name: 'inject-head-before-script',
        hooks: {
            'astro:config:setup': () => {
                const _dirname = dirname(fileURLToPath(import.meta.url))
                process.env.INJECT_BEFORE_HEAD_INLINE_SCRIPT = ''

                // #region - Inject theme check code
                process.env.INJECT_BEFORE_HEAD_INLINE_SCRIPT += esbuild.transformSync(
                    fs.readFileSync(
                        resolve(_dirname, '../client/head/checkTheme.ts'),
                        'utf-8',
                    ),
                    {
                        target: 'es5',
                        loader: 'ts',
                        banner: '<script id="check-dark-mode">',
                        footer: '</script>',
                        minify: true,
                    },
                ).code
                // #endregion

                // #region - Inject register global functions
                process.env.INJECT_BEFORE_HEAD_INLINE_SCRIPT += esbuild.transformSync(
                    fs.readFileSync(
                        resolve(_dirname, '../client/head/registGlobalFn.ts'),
                        'utf-8',
                    ),
                    {
                        target: 'es5',
                        loader: 'ts',
                        banner: '<script id="regist-global-fn">',
                        footer: '</script>',
                        minify: true,
                    },
                ).code
                // #endregion

                // console.log(process.env.INJECT_BEFORE_HEAD_INLINE_SCRIPT)
            },
        },
    }
}
