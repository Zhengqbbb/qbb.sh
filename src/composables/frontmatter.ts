import type { ComputedRef } from 'vue'
import type { PageMeta } from '~build/node'
import { appName, author, description, lang, ogImg, site, title as siteName } from '~/meta'
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
  const headerImage = computed(() => {
    const headerImage = meta.value.frontmatter.headerImage
    if (headerImage)
      return isExternal(headerImage) ? headerImage : site + headerImage
    return ogImg
  })

  useHead({
    title,
    htmlAttrs: {
      lang,
    },
    meta: [
      { name: 'author', content: author },
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: headerImage },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: computed(() => site + fullPath.value) },
      { name: 'application-name', content: appName },
      { name: 'apple-mobile-web-app-title', content: siteName },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'theme-color', content: computed(() => isDark.value ? '#050505' : '#ffffff') },
    ],
  })
}
