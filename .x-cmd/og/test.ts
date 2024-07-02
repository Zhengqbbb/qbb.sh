/**
 * For test and debug, Run the file directly
 * @cli tsx .x-cmd/og/test.ts
 * @cli tsx --watch .x-cmd/og/test.ts
 * @cli tsx .x-cmd/og/test.ts build
 */
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { resolve } from 'pathe'
import { genPNG } from './index'

(async function () {
    const __DIRNAME = dirname(fileURLToPath(import.meta.url))

    if (process.argv[2] !== 'build') {
        /** Debug Mode */
        await genPNG(
            resolve(__DIRNAME, './test.png'),
        )
    }
    else {
        const _SOURCE = resolve(__DIRNAME, '../../public/og')
        await genPNG(
            resolve(_SOURCE, 'index.png'),
        )
        await genPNG(
            resolve(_SOURCE, 'blog.png'),
            'Blog - Q.Ben Zheng',
            'Q.Ben\'s Blog | Zhengqbbb',
        )
        await genPNG(
            resolve(_SOURCE, 'project.png'),
            'Projects - Q.Ben Zheng',
            'Q.Ben\'s Projects | Zhengqbbb',
        )
    }
}()).catch((err: Error) => {
    console.error(err)
})
