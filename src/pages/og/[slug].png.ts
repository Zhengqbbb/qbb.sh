import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import type { APIRoute } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { resolve } from 'pathe'
import { getPostList } from '~/lib/server'
import { getPostImageBuffer } from '~/lib/server/og'

export async function getStaticPaths() {
    const _PROD_PUBLIC_OG_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../../og')
    const blogEntries = await getPostList()

    return blogEntries
        .filter((post) => {
            const existedPublic = existsSync(resolve(_PROD_PUBLIC_OG_DIR, `${post.slug}.png`))
            const hasExternalImage = !post.data.image?.startsWith('/og/')
            return !(existedPublic || hasExternalImage)
        })
        .map(post => ({
            params: { slug: post.slug },
            props: { ...post },
        }))
}

export const GET: APIRoute = async ({ props }) =>
    new Response(
        await getPostImageBuffer(props as CollectionEntry<'blog'>),
        {
            headers: { 'Content-Type': 'image/png' },
        },
    )
