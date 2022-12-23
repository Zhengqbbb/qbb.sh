<script setup lang="ts"></script>

<template>
  <div flex items-end justify-between lt-sm="flex-col-reverse items-start gap-3">
    <div>
      <h1 class="text-linear">
        <slot />
      </h1>
    </div>
    <div
      ref="avatar"
      class="w-24 h-24 border border-c rounded-full overflow-hidden"
      shadow="slate-200 dark:slate-800"
    >
      <img
        width="120" height="120"
        class="m-0! not-zoom avatar"
        onload="this.classList.add('loaded');"
        alt="avatar"
        src="/me.webp"
      >
    </div>
  </div>
</template>

<style scoped>
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
