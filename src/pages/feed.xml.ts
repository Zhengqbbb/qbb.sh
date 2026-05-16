import rss from '@astrojs/rss'
import { getPostList } from '~/lib/server'
import Meta from '~/meta'

export async function GET() {
    const posts = await getPostList().then((r) => {
        return r.filter(post => !!post.data.date)
    })

    return rss({
        title: Meta.title,
        description: Meta.description,
        site: Meta.site,
        items: posts.map(item => ({
            link: `/posts/${item.id}`,
            title: item.data.title,
            description: item.data.desc,
            author: `${Meta.email} (${Meta.author})`,
            pubDate: new Date(item.data.date!.iso),
            enclosure: {
                url: `${Meta.site}/og/${item.id}.png`,
                length: 0,
                type: 'image/png',
            },
        })),
    })
}
