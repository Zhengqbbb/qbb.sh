/**
 * For test and debug, Run the file directly
 * @cli tsx ./src/lib/server/og/test.ts
 * @cli tsx --watch ./src/lib/server/og/test.ts
 */
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolve } from 'pathe'
import { genPNG } from './index'

(async function () {
    const _DIRNAME = dirname(fileURLToPath(import.meta.url))
    // const res = await genSVG()
    // console.log(res)

    /** Debug */
    // await genPNG(
    //     resolve(_DIRNAME, './test.png'),
    // )

    // await genPNG(
    //     resolve(_DIRNAME, '../../../../public/og/blog.png'),
    //     'Blog - Q.Ben Zheng',
    //     'Q.Ben\'s Blog | Zhengqbbb',
    // )
    await genPNG(
        resolve(_DIRNAME, '../../../../public/og/project.png'),
        'Projects - Q.Ben Zheng',
        'Q.Ben\'s Projects | Zhengqbbb',
    )
}()).catch((err: Error) => {
    console.error(err)
})
