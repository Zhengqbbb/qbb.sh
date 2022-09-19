<script setup lang="ts">
import { isClient } from '~/utils'

useHead({
  title: 'Q.Ben Zheng | Zhengqbbb',
  meta: [
    { name: 'description', content: 'Q.Ben Zheng\'s Personal Website' },
    { name: 'keywords', content: 'Q.Ben, qbb, Zhengqbbb, Qbenben' },
    { name: 'author', content: 'Zhengqbbb' },
    { property: 'og:title', content: 'Q.Ben Zheng' },
    { property: 'og:image', content: 'https://qbb.sh/avatar.jpeg' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@zhengqbbb' },
    { name: 'application-name', content: 'Q.Ben' },
    { name: 'apple-mobile-web-app-title', content: 'Q.Ben | Zhengqbbb' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'theme-color', content: computed(() => isDark.value ? '#050505' : '#ffffff') },
  ],
  link: [
    { rel: 'shortcut icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/svg+xml', href: '/logo-dark.svg' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#aaaaaa' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-touch-120x120.png' },
  ],
})

// Scroll to top after route change
const route = useRoute()

watch(
  () => route.path,
  () => isClient && window.scrollTo({ top: 0 }),
)
</script>

<template>
  <RouterView />
</template>
