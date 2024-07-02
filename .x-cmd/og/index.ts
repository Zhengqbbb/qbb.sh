import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'pathe'
import type { SatoriOptions } from 'satori'
import satori from 'satori'
import { Resvg, renderAsync } from '@resvg/resvg-js'
import template from './template'

const _DIRNAME = dirname(fileURLToPath(import.meta.url))
/**
 * That is why I don't use Astro file interface to gen OpenGraph image.
 * It look like designed for SSR more, not for SSG.
 * Using build end hook replace it.
 */
// const _DIRNAME = import.meta?.env?.PROD
//     ? resolve(dirname(fileURLToPath(import.meta.url)), '../../src/lib/server/og')
//     : dirname(fileURLToPath(import.meta.url))

export const baseSatoriOpts: SatoriOptions = {
    width: 1200,
    height: 628,
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
}

export async function genSVG(
    title?: string,
    desc?: string,
    site?: string,
) {
    return await satori(template(title, desc, site), baseSatoriOpts)
}

/** For mian.ts debug */
export async function genPNG(
    output: string,
    title?: string,
    desc?: string,
    site?: string,
) {
    const svg = await genSVG(title, desc, site)
    const render = await renderAsync(svg, {
        fitTo: {
            mode: 'width',
            value: 1200,
        },
        imageRendering: 0,
    })
    return await writeFile(output, render.asPng())
}

/** For astro gen */
export async function genPNGBuffer(
    title?: string,
    desc?: string,
    site?: string,
) {
    const svg = await genSVG(title, desc, site)
    const resvg = new Resvg(svg, {
        fitTo: {
            mode: 'width',
            value: 1200,
        },
    })
    const pngData = resvg.render()
    return pngData.asPng()
}
