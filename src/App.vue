<script setup lang="ts">
import { isClient } from '~/utils'

useHeadByFrontmatter()

// Scroll to top after route change
const route = useRoute()
watch(
  () => route.path,
  () => isClient && window.scrollTo({ top: 0 }),
)

useCopyCode()
</script>

<template>
  <NavBar />
  <main p="x-4 t-26">
    <RouterView />
  </main>
</template>
