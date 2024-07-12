import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'
import { resolve } from 'pathe'
import { Resvg } from '@resvg/resvg-js'
import { satoriAstro } from 'x-satori/astro'
import type { CollectionEntry } from 'astro:content'

const _DIRNAME = import.meta.env?.PROD
    ? resolve(dirname(fileURLToPath(import.meta.url)), '../../src/lib/server/og')
    : dirname(fileURLToPath(import.meta.url))

export async function getPostImageBuffer(props: CollectionEntry<'blog'>) {
    const template = await readFile(resolve(_DIRNAME, './Template.astro'), 'utf-8')
    const config = (await import('./config')).default
    config.props = props.data
    const svg = await satoriAstro(config, template)
    const resvg = new Resvg(svg, {
        fitTo: {
            mode: 'width',
            value: 1200,
        },
        imageRendering: 0,
    })
    const pngData = resvg.render()
    return pngData.asPng()
}
