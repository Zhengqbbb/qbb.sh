import fs from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import { resolve } from 'pathe'
import { calcReadingTime } from './readtime'

export const postHasDate = (post: CollectionEntry<'blog'>) => !!post.data.date

/** parsed post data */
export async function getPostList(): Promise<CollectionEntry<'blog'>[]> {
    const posts = await getCollection('blog')
    let res = posts
        .map((post) => {
            post.data.lang = post.slug.endsWith('-zh') ? 'zh' : 'en'
            post.data.image ??= `/og/posts-${post.slug}.png`
            post.data.readTime = `${calcReadingTime(post.body).minutes}`
            post.data.link = `/posts/${post.slug}`
            const date = post.slug.substring(0, 10)
            if (date.length !== 10)
                return post
            post.data.date = {
                date,
                year: date.substring(0, 4),
                iso: new Date(date).toISOString(),
                listText: new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                }),
                postText: new Date(date).toLocaleDateString(post.data.lang === 'zh' ? 'zh-CN' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                }),
            }
            return post
        })
        .sort((a, b) => {
            return a!.slug > b!.slug ? -1 : 1
        }) as Required<typeof posts>

    res = res.map((post, idx) => {
        if (res?.[idx + 1] && (postHasDate(res?.[idx + 1]))) {
            post.data.next = {
                title: res[idx + 1].data.title,
                link: res[idx + 1].data.link || '',
            }
        }
        if (res?.[idx - 1] && (postHasDate(res?.[idx - 1]))) {
            post.data.prev = {
                title: res[idx - 1].data.title,
                link: res[idx - 1].data.link || '',
            }
        }

        // console.log(JSON.stringify(post.data, null, 2))
        return post
    })

    return res as Required<typeof posts>
}

declare global {
    /** The main code is using layout. Use in memory storage */
    // eslint-disable-next-line vars-on-top, no-var
    var __C_MAIN_RAW: string
}
export function getMainFileRaw() {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    /** ... 😃 astro __dirname are diff dev and prod */
    if (import.meta.env.MODE === 'development') {
        const mainPath = resolve(__dirname, '../client/main.js')
        return fs.readFileSync(mainPath, 'utf-8')
    }
    else {
        const mainPath = resolve(__dirname, '../../src/lib/client/main.js')
        if (globalThis.__C_MAIN_RAW) {
            return globalThis.__C_MAIN_RAW
        }
        else {
            globalThis.__C_MAIN_RAW = fs.readFileSync(mainPath, 'utf-8')
            return globalThis.__C_MAIN_RAW
        }
    }
}

export function isExternal(path: string) {
    const outboundRE = /^(?:https?:|mailto:|tel:)/
    return outboundRE.test(path)
}
