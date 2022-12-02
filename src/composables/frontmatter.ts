import type { ComputedRef } from 'vue'
import type { PageMeta } from '~build/node'
import { description, ogImg, site, name as siteName } from '~/meta'

/**
 * data generate base (/build/node/resolvePost.ts)
 * Reactive setup current page OG head tag and title, description by current page frontmatter
 */
export const useHeadByFrontmatter = (): void => {
  const router = useRouter()
  const meta = computed(() => router.currentRoute.value.meta) as ComputedRef<PageMeta>
  const fullPath = computed(() => router.currentRoute.value.fullPath)

  const title = computed(() => meta.value.frontmatter.title || siteName)
  const desc = computed(() => meta.value.frontmatter.description || meta.value.frontmatter.desc || description)
  const headerImage = ogImg
  // TODO: auto gen
  // const routerName = computed(() => router.currentRoute.value.name)
  // const headerImage = computed(() => meta.value.frontmatter.headerImage || `${site}/og/${String(routerName.value)}.png`)
  const lang = computed(() => meta.value.lang)

  useHead({
    title: computed(() => meta.value.frontmatter.title || siteName),
    htmlAttrs: {
      lang,
    },
    meta: [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: headerImage },
      { property: 'og:url', content: computed(() => site + fullPath.value) },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: headerImage },
    ],
  })
}
