<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import type { PostMeta } from '~build/node'
import { formatDate } from '~/utils'
import { description, ogImg, site, name as siteName } from '~/meta'

const router = useRouter()
const meta = computed(() => router.currentRoute.value.meta) as unknown as ComputedRef<PostMeta>
const fullPath = computed(() => router.currentRoute.value.fullPath)
// const name = computed(() => router.currentRoute.value.name)

const title = computed(() => meta.value.frontmatter.title || siteName)
const desc = computed(() => meta.value.frontmatter.description || meta.value.frontmatter.desc || description)
// const headerImage = computed(() => meta.value.frontmatter.headerImage || `${site}/og/${String(name.value)}.png`)
const headerImage = ogImg
const date = computed(() => meta.value.date)
const lang = computed(() => meta.value.lang)
const readingTime = computed(() => meta.value.readingTime)

const prevPost = computed(() => meta.value.prev)
const nextPost = computed(() => meta.value.next)

useHead({
  title,
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
</script>

<template>
  <div class="prose m-auto mb-space">
    <h1>{{ title }}</h1>
    <p class="opacity-50">
      {{ formatDate(date, lang) }} · {{ readingTime.minutes }}{{ lang === 'zh' ? '分钟' : 'min' }}
    </p>
  </div>

  <article>
    <RouterView class="post" />
  </article>

  <div class="prose m-auto my-8">
    <hr>
    <div
      v-if="(prevPost || nextPost)"
      class="flex flex-col lt-sm:gap-4 sm:flex-row"
      :class="[!prevPost ? 'sm:justify-end' : 'sm:justify-between']"
    >
      <div
        v-if="prevPost"
        class="w-48% lt-sm:w-100% border border-c-border rd opacity-70 transition-colors"
        hover="opacity-100 border-brand"
      >
        <router-link :to="prevPost.path" class="!border-none block p-4">
          <div class="text-xs text-c-fg">
            Previous page
          </div>
          <div class="text-c-fgDeep text-sm leading-none mt-2">
            {{ prevPost.title }}
          </div>
        </router-link>
      </div>
      <div
        v-if="nextPost"
        class="w-48% lt-sm:w-100% border border-c-border rd opacity-70 transition-colors"
        hover="opacity-100 border-brand"
      >
        <router-link :to="nextPost.path" class="!border-none block p-4">
          <div class="text-end text-xs text-c-fg">
            Next page
          </div>
          <div class="text-end text-c-fgDeep text-sm leading-none mt-2">
            {{ nextPost.title }}
          </div>
        </router-link>
      </div>
    </div>
  </div>

  <Footer />
</template>
