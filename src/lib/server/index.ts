import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'
import Meta from '~/meta'
import { calcReadingTime } from './readtime'

export const postHasDate = (post: CollectionEntry<'blog'>) => !!post.data.date

/** parsed post data */
export async function getPostList(): Promise<CollectionEntry<'blog'>[]> {
    const posts = await getCollection('blog')
    let res = posts
        .map((post) => {
            post.data.lang = post.id.endsWith('-zh') ? 'zh' : 'en'
            post.data.image ??= `/og/${post.id}.png`
            post.data.readTime = `${calcReadingTime(post.body ?? '').minutes}`
            post.data.link = `/posts/${post.id}`
            const date = post.id.substring(0, 10)
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
            return a!.id > b!.id ? -1 : 1
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

export function isExternal(path: string) {
    const outboundRE = /^(?:https?:|mailto:|tel:)/
    return outboundRE.test(path)
}

export function getImageUrl(src: string) {
    return import.meta.env?.PROD ? Meta.cdnUrl + src : src
}
