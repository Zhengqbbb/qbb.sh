import process from 'node:process'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { AstroIntegration } from 'astro'
import esbuild from 'esbuild'
import { resolve } from 'pathe'

export default function injectAfterHeadEl(): AstroIntegration {
    return {
        name: 'inject-head-after-script',
        hooks: {
            'astro:config:setup': () => {
                const _dirname = dirname(fileURLToPath(import.meta.url))
                process.env.INJECT_AFTRE_HEAD_INLINE_SCRIPT = ''

                // #region - Inject main inline code
                process.env.INJECT_AFTRE_HEAD_INLINE_SCRIPT += esbuild.buildSync(
                    {
                        entryPoints: [resolve(_dirname, '../../main.ts')],
                        format: 'esm',
                        loader: { '.ts': 'ts' },
                        bundle: true,
                        minify: true,
                        write: false,
                        banner: { js: '<script type="module">' },
                        footer: { js: '</script>' },
                    },
                ).outputFiles[0].text
                // #endregion

                // console.log(process.env.INJECT_AFTRE_HEAD_INLINE_SCRIPT)
            },
        },
    }
}
