<script setup lang="ts">
import { isClient } from '~/utils'
import { github, site } from '~/meta'

const navbar = ref<HTMLElement | null>(null)
const isLeave = ref(false)
const isVisible = ref(false)

if (isClient) {
  const { y, directions } = useScroll(document)

  watch(y, () => {
    if (directions.top) {
      // scrolling up
      if (y.value > 0 && isLeave.value) {
        isVisible.value = true
      }
      else {
        isVisible.value = false
        isLeave.value = false
      }
    }
    else if (directions.bottom) {
      // scrolling down
      isVisible.value = false
      if (navbar.value && y.value > navbar.value!.offsetHeight)
        isLeave.value = true
    }
  })
}
</script>

<template>
  <header
    ref="navbar"
    class="z-40 w-full h-20 bg-c-bg bg-op-90 dark:bg-op-90 backdrop-blur-2 backdrop-saturate-50 select-none"
    :class="[
      isLeave
        && 'fixed -top-20 left-0 transition-transform duration-300',
      isVisible && 'translate-y-full',
      !isLeave && !isVisible && 'absolute top-0 left-0',
    ]"
  >
    <div class="max-w-120ch m-auto flex justify-between items-center">
      <router-link
        class="w-11 h-11 m-6 outline-none hover:op-70 transition-opacity" to="/"
      >
        <img v-show="isDark" width="44" height="44" src="/logo-dark.svg" alt="logo">
        <img v-show="!isDark" width="44" height="44" src="/logo-light.svg" alt="logo">
      </router-link>

      <nav class="nav box-border p-8 flex items-center space-x-3">
        <router-link to="/posts" title="Blog" class="nav-item">
          <div i-majesticons:paper-fold-text-line class="md:hidden" />
          <span class="lt-md:hidden">Blog</span>
        </router-link>
        <router-link to="/projects" title="Projects" class="nav-item">
          <div i-ph:rocket-launch-duotone class="md:hidden" />
          <span class="lt-md:hidden">Projects</span>
        </router-link>
        <span class="nav-divider" />

        <a :href="github" target="_blank" title="GitHub" rel="noreferrer">
          <div i-uil-github-alt />
        </a>
        <a :href="`${site}/feed.xml`" target="_blank" title="RSS">
          <div i-lucide:rss />
        </a>
        <span class="nav-divider" />

        <button title="Toggle Color Scheme" @click="toggleDark()">
          <div i="ri-sun-line dark:ri-moon-line" />
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav a,
.nav button{
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover,
.nav button:hover{
  opacity: 1;
  text-decoration-color: inherit;
}
</style>
