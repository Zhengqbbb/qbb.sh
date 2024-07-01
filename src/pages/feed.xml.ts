import rss from '@astrojs/rss'
import Meta from '~/meta'
import { getPostList } from '~/lib/server'

export async function GET() {
    const posts = await getPostList().then((r) => {
        return r.filter(post => !!post.data.date)
    })

    return rss({
        title: Meta.title,
        description: Meta.description,
        site: Meta.site,
        items: posts.map(item => ({
            link: `/posts/${item.slug}`,
            title: item.data.title,
            description: item.data.desc,
            author: `${Meta.email} (${Meta.author})`,
            pubDate: new Date(item.data.date!.iso),
            customData: `<enclosure url="${Meta.site}/og/posts-${item.slug}.png" length="0" type="image/png" />`,
        })),
    })
}
