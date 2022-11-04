<script setup lang="ts">
import { isClient } from '~/utils'

useHead({
  title: 'Q.Ben Zheng | Zhengqbbb',
  meta: [
    { property: 'og:image', content: 'https://qbb.sh/og-icon.png' },
    { property: 'og:title', content: 'Q.Ben Zheng | Zhengqbbb' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@zhengqbbb' },
    { name: 'description', content: 'Q.Ben Zheng\'s Personal Website' },
    { name: 'keywords', content: 'Zhengqbbb, Q.Ben, qbb, Qbenben' },
    { name: 'author', content: 'Zhengqbbb' },
    { name: 'application-name', content: 'Q.Ben' },
    { name: 'apple-mobile-web-app-title', content: 'Q.Ben | Zhengqbbb' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'theme-color', content: computed(() => isDark.value ? '#050505' : '#ffffff') },
  ],
})

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
