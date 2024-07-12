import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'pathe'
import { Resvg, renderAsync } from '@resvg/resvg-js'
import { satoriAstro } from 'x-satori/astro'

const _DIRNAME = dirname(fileURLToPath(import.meta.url))

export async function genSVG(
    title?: string,
    desc?: string,
    site?: string,
) {
    const template = await readFile(resolve(_DIRNAME, './Template.astro'), 'utf-8')
    return await satoriAstro(
        {
            props: {
                title,
                desc,
                site,
            },
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
        },
        template,
    )
}

/** For mian.ts */
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
