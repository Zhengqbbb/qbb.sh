<script setup lang="ts">
import { isClient } from '~/utils'
import { appName, author, description, keywords, name, ogImg, ogTitle, site, twitterCreator } from '~/meta'

useHead({
  title: name,
  meta: [
    { name: 'author', content: author },
    { name: 'keywords', content: keywords },
    { name: 'description', content: description },
    { property: 'og:url', content: site },
    { property: 'og:title', content: ogTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImg },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: twitterCreator },
    { name: 'twitter:title', content: ogTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImg },
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
