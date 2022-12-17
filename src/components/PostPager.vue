<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import type { PostPager } from '~build/node'

const router = useRouter()
const prevPost = computed(() => router.currentRoute.value.meta.prev) as ComputedRef<PostPager>
const nextPost = computed(() => router.currentRoute.value.meta.next) as ComputedRef<PostPager>
</script>

<template>
  <div
    v-if="(prevPost || nextPost)"
    class="flex flex-col lt-sm:gap-4 sm:flex-row"
    :class="[!prevPost ? 'sm:justify-end' : 'sm:justify-between']"
  >
    <div
      v-if="prevPost"
      class="w-48% lt-sm:w-100% border border-c-border rd op-70 transition-colors"
      hover="op-100 border-brand"
    >
      <router-link :to="prevPost.path" class="!border-none block p-4">
        <div class="text-xs text-c-fg">
          上一篇
        </div>
        <div class="text-c-fgDeep text-sm leading-none mt-2">
          {{ prevPost.title }}
        </div>
      </router-link>
    </div>
    <div
      v-if="nextPost"
      class="w-48% lt-sm:w-100% border border-c-border rd op-70 transition-colors"
      hover="op-100 border-brand"
    >
      <router-link :to="nextPost.path" class="!border-none block p-4">
        <div class="text-end text-xs text-c-fg">
          下一篇
        </div>
        <div class="text-end text-c-fgDeep text-sm leading-none mt-2">
          {{ nextPost.title }}
        </div>
      </router-link>
    </div>
  </div>
</template>
