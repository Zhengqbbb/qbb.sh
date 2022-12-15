<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import type { PageMeta } from '~build/node'
import { formatDate } from '~/utils'
import { title as siteName } from '~/meta'

const router = useRouter()
const meta = computed(() => router.currentRoute.value.meta) as ComputedRef<PageMeta>

const title = computed(() => meta.value.frontmatter.title || siteName)
const date = computed(() => meta.value.date)
const readingTime = computed(() => meta.value.readingTime)

const content = ref<HTMLDivElement>()
onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      const target = document.querySelector(decodeURIComponent(location.hash)) as HTMLElement
      if (target) {
        const { y } = useElementBounding(target)
        if (y.value >= 0) {
          // scrolling down
          target.scrollIntoView({ behavior: 'smooth' })
        }
        else {
          // scrolling up
          const { y: current } = useWindowScroll()
          window.scrollTo({
            top: current.value + y.value - 100,
            behavior: 'smooth',
          })
        }
      }
    }
  }

  const handleAnchors = (event: MouseEvent & { target: HTMLElement }) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  navigate()
  setTimeout(navigate, 500)
})
</script>

<template>
  <div class="prose m-auto mb-space">
    <h1>{{ title }}</h1>
    <p class="op-50">
      {{ formatDate(date) }} · {{ readingTime.minutes }}min
    </p>
  </div>

  <article ref="content">
    <RouterView class="post" />
  </article>

  <div class="prose m-auto my-8">
    <hr>
    <PostPager />
    <Footer />
  </div>
</template>
