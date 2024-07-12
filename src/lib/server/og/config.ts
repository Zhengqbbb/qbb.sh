import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineSatoriConfig } from 'x-satori/astro'
import Meta from '../../../meta' /** @see package.json `pnpm og:dev` => For CLI using a relative path */

const _DIRNAME = import.meta.env?.PROD
    ? resolve(dirname(fileURLToPath(import.meta.url)), '../../src/lib/server/og')
    : dirname(fileURLToPath(import.meta.url))

export default defineSatoriConfig({
    height: 628,
    width: 1200,
    props: {
        title: Meta.title,
        desc: Meta.description,
        site: Meta.siteShort,
    },
    fonts: [
        {
            name: 'Inter',
            data: await readFile(resolve(_DIRNAME, './font/Inter-Medium.woff')),
            weight: 400,
            style: 'normal',
        },
        {
            name: 'Inter',
            data: await readFile(resolve(_DIRNAME, './font/Inter-Bold.woff')),
            weight: 700,
            style: 'normal',
        },
        {
            name: 'Noto Sans SC',
            data: await readFile(resolve(_DIRNAME, './font/NotoSansSC-Medium.otf')),
            weight: 400,
            style: 'normal',
        },
        {
            name: 'Noto Sans SC',
            data: await readFile(resolve(_DIRNAME, './font/NotoSansSC-Bold.otf')),
            weight: 700,
            style: 'normal',
        },
        {
            name: 'Noto Sans Symbols',
            data: await readFile(resolve(_DIRNAME, './font/NotoSansSymbols2-Regular.ttf')),
            weight: 700,
            style: 'normal',
        },
    ],
})
