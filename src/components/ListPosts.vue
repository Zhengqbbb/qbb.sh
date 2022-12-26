<script setup lang="ts">
import dayjs from 'dayjs'
const { posts, mappingPostYear } = usePosts()
</script>

<template>
  <ul class="pt-4">
    <template v-if="!posts.length">
      <div class="text-center op-80">
        nothing here yet
      </div>
    </template>
    <template v-for="year in Object.keys(mappingPostYear).reverse()" :key="year">
      <div class="my-4 text-2em op-40 top--2rem font-bold">
        {{ year }}
      </div>
      <router-link
        v-for="post in mappingPostYear[year]"
        :key="post.path"
        :to="post.path"
        class="item"
      >
        <li class="relative flex flex-col justify-center">
          <div :title="post.title" class="flex-1 text-lg">
            {{ post.title }}
          </div>
          <time
            :datetime="dayjs(post.meta.date).toISOString()"
            class="text-sm op-50"
          >
            <i v-if="post.meta.lang === 'zh'" class="md:absolute left--6 top-1 i-icon-park-outline:chinese" />
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
