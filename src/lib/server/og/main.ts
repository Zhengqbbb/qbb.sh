import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'
import fs from 'node:fs'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { resolve } from 'pathe'
import { genPNG } from './index'

(async function () {
    const __DIRNAME = dirname(fileURLToPath(import.meta.url))
    const __SOURCE = resolve(__DIRNAME, '../../../content/blog')
    const __OUTPUT = resolve(__DIRNAME, '../../../../public/og')

    const files = fg.sync('**/*.{md,mdx}', { cwd: __SOURCE, absolute: true })

    return await Promise.all(
        files.map(async (p) => {
            const tmpPath = p
                .replace(__SOURCE, '')
                .replace(/(\.md|\.mdx)$/, '.png')
                .replaceAll('/', '-')
                .substring(1)
                .replace(/(-index\.png)$/, '.png')
            const targetFile = resolve(__OUTPUT, tmpPath)

            // has been generated
            if (fs.existsSync(targetFile) || !tmpPath.startsWith('20'))
                return false

            const raw = await readFile(p, 'utf-8')
            const { data } = matter(raw)
            const { title, desc, image } = data as Record<string, string>
            if (typeof image === 'string')
                return false
            await genPNG(targetFile, title, desc)
        }),
    )
}()).catch((err: Error) => {
    console.error(err)
})
