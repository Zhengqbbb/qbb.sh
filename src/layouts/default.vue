<script lang="ts" setup>
const bg = ref<HTMLElement | null>(null)
onMounted(() => {
  const bgImg = new Image()
  bgImg.src = '/bg.webp'
  bgImg.onload = () => bg.value!.style.backgroundImage = 'url(/bg.webp)'
})
</script>

<template>
  <div class="min-h-100vh">
    <RouterView />
    <Footer class="max-w-content m-auto" />
    <span
      ref="bg"
      class="fixed inset-0 z--1"
      bg="no-repeat right-top fixed"
    />
  </div>
</template>
