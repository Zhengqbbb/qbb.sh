import type { ComputedRef } from 'vue'
import type { PageMeta } from '~build/node'
import { appName, author, description, keywords, site, title as siteName, twitterCreator } from '~/meta'
import { isExternal } from '~/utils'

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
  const routerName = computed(() => router.currentRoute.value.name)
  const headerImage = computed(() => {
    const headerImage = meta.value.frontmatter.headerImage
    if (headerImage)
      return isExternal(headerImage) ? headerImage : site + headerImage
    return `${site}/og/${String(routerName.value)}.png`
  })
  const lang = computed(() => meta.value.lang)

  useHead({
    title,
    htmlAttrs: {
      lang,
    },
    meta: [
      { name: 'author', content: author },
      { name: 'keywords', content: keywords },
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: headerImage },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: computed(() => site + fullPath.value) },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: twitterCreator },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: headerImage },
      { name: 'application-name', content: appName },
      { name: 'apple-mobile-web-app-title', content: siteName },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'theme-color', content: computed(() => isDark.value ? '#050505' : '#ffffff') },
    ],
  })
}
