<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { giscusConfig } from '~/meta'
import { isClient } from '~/utils'
import type { PageMeta } from '~build/node'
const router = useRouter()
const meta = computed(() => router.currentRoute.value.meta) as ComputedRef<PageMeta>

const lang = computed(() => meta.value.lang === 'zh' ? 'zh-CN' : 'en')
const theme = computed(() => isDark.value ? 'dark_protanopia' : 'light')

if (isClient) {
  /** @see https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md */
  const getScriptElement = () => {
    const element = document.createElement('script')
    element.setAttribute('src', 'https://giscus.app/client.js')
    element.setAttribute('async', 'true')
    element.setAttribute('crossorigin', 'anonymous')
    /** @types https://github.com/giscus/giscus/blob/main/lib/types/giscus.ts */
    element.setAttribute('data-repo', giscusConfig.repo)
    element.setAttribute('data-repo-id', giscusConfig.repoId)
    element.setAttribute('data-category', giscusConfig.category)
    element.setAttribute('data-category-id', giscusConfig.categoryId)
    element.setAttribute('data-theme', theme.value)
    element.setAttribute('data-lang', lang.value)
    element.setAttribute('data-mapping', 'pathname')
    element.setAttribute('data-input-position', 'top')
    element.setAttribute('data-reactions-enabled', '1')
    element.setAttribute('data-emit-metadata', '0')
    return element
  }

  const scriptElement = ref<HTMLScriptElement>(getScriptElement())

  onMounted(() => document.head.appendChild(scriptElement.value))
  onBeforeUnmount(() => document.head.removeChild(scriptElement.value))

  watch ([theme], () => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame',
    )
    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: theme.value,
          },
        },
      },
      'https://giscus.app',
    )
  })
}
</script>

<template>
  <div class="giscus" />
</template>
