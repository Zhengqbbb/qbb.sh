import type { CollectionEntry } from 'astro:content'
import { existsSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolve } from 'pathe'
import { getPostList } from '~/lib/server'
import { getPostImageBuffer } from '~/lib/server/og'

/**
 * 本文件为 `*.png.ts` 端点；部分 TS/IDE 对 `from 'astro'` 的 `export type *` 解析不完整，
 * 故仅声明此处用到的上下文字段（与 Astro 端点 GET 的 `props` 一致）。
 */
interface OGImageEndpointContext {
    props: CollectionEntry<'blog'>
}

export async function getStaticPaths() {
    const _PROD_PUBLIC_OG_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../../og')
    const blogEntries = await getPostList()

    return blogEntries
        .filter((post) => {
            const existedPublic = existsSync(resolve(_PROD_PUBLIC_OG_DIR, `${post.id}.png`))
            const hasExternalImage = !post.data.image?.startsWith('/og/')
            return !(existedPublic || hasExternalImage)
        })
        .map(post => ({
            params: { slug: post.id },
            props: { ...post },
        }))
}

export async function GET({ props }: OGImageEndpointContext): Promise<Response> {
    const buffer = await getPostImageBuffer(props)
    return new Response(
        new Uint8Array(buffer),
        {
            headers: { 'Content-Type': 'image/png' },
        },
    )
}
