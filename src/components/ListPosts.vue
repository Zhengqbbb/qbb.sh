<script setup lang="ts">
import dayjs from 'dayjs'
import { formatDate } from '~/utils'
import type { PageMeta, PostRouterRecord } from '~build/node'

const router = useRouter()
const posts = router.getRoutes()
  .filter(page => page.meta.layout === 'post')
  .map(
    (page: any): PostRouterRecord => {
      const meta: PageMeta = page.meta
      return {
        ...page,
        title: meta.frontmatter.title,
        readingTimeText: `${String(meta.readingTime.minutes)} min`,
        dateText: formatDate(meta.date),
      }
    },
  )
  .sort((a, b) => dayjs(b.meta.date).unix() - dayjs(a.meta.date).unix())

const blogMap: Record<string, PostRouterRecord[]> = {}
for (const post of posts) {
  const year = post.meta.date ? post.meta.date.substring(0, 4) : new Date().getFullYear()
  blogMap[year] ? blogMap[year].push(post) : (blogMap[year] = [post])
}
</script>

<template>
  <ul class="pt-4">
    <template v-if="!posts.length">
      <div class="text-center op-80">
        nothing here yet
      </div>
    </template>
    <template v-for="year in Object.keys(blogMap).reverse()" :key="year">
      <div class="my-4 text-2em op-40 top--2rem font-bold">
        {{ year }}
      </div>
      <router-link v-for="post in blogMap[year]" :key="post.path" :to="post.path" class="item">
        <li class="relative flex flex-col justify-center">
          <div :title="post.title" class="flex-1 text-lg">
            {{ post.title }}
          </div>
          <time
            :datetime="dayjs(post.meta.date).toISOString()"
            class="text-sm op-50 tracking-wid"
          >
            {{ post.dateText }} · {{ post.readingTimeText }}
          </time>
        </li>
      </router-link>
    </template>
  </ul>
</template>

<style scoped>
.prose a.item{
  --at-apply: block border-b-none rd-rt rd-rb py-1 md:pl-8 pl-0 md:border-l-4 border-c-border transition;
  --at-apply: text-c-dim hover:(text-c-fgDeeper bg-gray bg-op-10);
}
</style>
