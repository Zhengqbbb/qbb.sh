import dayjs from 'dayjs'
import { formatDate } from '~/utils'
import type { PageMeta, PostRouterRecord } from '~build/node'

export function getPosts(routers: any[]) {
  return routers
    .filter(page => page.meta.layout === 'post')
    .map(
      (page: any): PostRouterRecord => {
        const meta: PageMeta = page.meta
        return {
          ...page,
          title: meta.frontmatter.title,
          headerImage: meta.frontmatter.headerImage,
          readingTimeText: `${String(meta.readingTime.minutes)} ${
            meta.lang === 'zh'
            ? '分钟'
            : 'min'
          }`,
          dateText: formatDate(meta.date),
        }
      },
    )
    .sort((a, b) => dayjs(b.meta.date).unix() - dayjs(a.meta.date).unix())
}

export function usePosts() {
  const router = useRouter()

  const posts = computed<PostRouterRecord[]>(() =>
    getPosts(router.getRoutes().filter(v => v.name)),
  )

  const mappingPostYear = computed(() => {
    const map: Record<string, PostRouterRecord[]> = {}
    for (const post of posts.value) {
      const year = post.meta.date ? post.meta.date.substring(0, 4) : new Date().getFullYear()
      map[year] ? map[year].push(post) : (map[year] = [post])
    }

    return map
  })

  return { posts, mappingPostYear }
}
