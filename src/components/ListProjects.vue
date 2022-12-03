<script setup lang="ts">
defineProps<{ projects: Record<string, any[]> }>()
</script>

<template>
  <template v-for="title in Object.keys(projects)" :key="title">
    <h3>{{ title }}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 py-2 gap-2">
      <a
        v-for="item, idx in projects[title]" :key="idx"
        :href="item.link"
        :title="item.name"
        target="_blank"
        class="item flex items-center space-x-5"
      >
        <div class="space-x-10">
          <XCmd v-if="item.icon === 'x-cmd'" class="text-4xl" />
          <div v-else :class="item.icon || 'i-carbon-unknown'" class="text-4xl" />
        </div>
        <div class="flex-auto">
          <div class="text-1.1rem whitespace-pre-wrap">{{ item.name }}</div>
          <div class="op-70 text-sm whitespace-pre-wrap">{{ item.desc }}</div>
        </div>
      </a>
    </div>
  </template>
</template>

<style scoped>
.prose a.item{
  --at-apply: py-4 px-4 border-b-none rd transition;
  --at-apply: text-c-dim hover:(text-c-fgDeeper bg-gray bg-op-10);
}
</style>
