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
    await genPNG(
        resolve(_DIRNAME, './test.png'),
    )
}()).catch((err: Error) => {
    console.error(err)
})
