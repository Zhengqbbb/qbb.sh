<script setup lang="ts">
const loadState = ref('')
onMounted(() => {
  const avatar = new Image()
  avatar.src = '/me.webp'
  avatar.onload = () => loadState.value = 'loaded'
  avatar.onerror = () => loadState.value = 'unload'
})
</script>

<template>
  <div flex items-end justify-between lt-sm="flex-col-reverse items-start gap-3">
    <div>
      <h1 class="text-linear">
        <slot />
      </h1>
    </div>
    <div
      class="w-24 h-24 border rounded-full overflow-hidden z-1"
      :class="{ 'op-0': loadState === 'unload' }"
      shadow="slate-200 dark:slate-800"
    >
      <img
        alt="avatar"
        width="120" height="120"
        class="m-0! not-zoom avatar"
        :class="{ loaded: loadState === 'loaded' }"
        :src="loadState === 'loaded' ? '/me.webp' : ''"
      >
    </div>
  </div>
</template>

<style scoped>
.text-linear {
  background: var(--c-text-gradient);
  -webkit-text-fill-color: transparent;
  --at-apply: bg-clip-text;
}

.avatar.loaded{
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
}

.avatar{
  opacity: 0;
  transform: scale(1.5);
  filter: blur(8px);
  transition: .8s ease;
  transition-property: filter,opacity,transform;
  will-change: filter,transform;
}
</style>
