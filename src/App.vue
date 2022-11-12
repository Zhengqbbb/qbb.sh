<script setup lang="ts">
import { isClient } from '~/utils'
import { appName, author, description, keywords, name, ogImg, ogTitle, twitterCreator } from '~/meta'

useHead({
  title: name,
  meta: [
    { property: 'og:image', content: ogImg },
    { property: 'og:title', content: ogTitle },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: twitterCreator },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'author', content: author },
    { name: 'application-name', content: appName },
    { name: 'apple-mobile-web-app-title', content: name },
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
