<script setup lang="ts">
import { isDark } from '~/composables'
import { isClient } from '~/utils'

const navbar = ref<HTMLElement | null>(null)
const isFixed = ref(false)
const isVisible = ref(false)

if (isClient) {
  const { y, directions } = useScroll(document)

  watch(y, () => {
    if (directions.top) {
      // scrolling up
      if (y.value > 0 && isFixed.value) { isVisible.value = true }
      else {
        isVisible.value = false
        isFixed.value = false
      }
    }
    else if (directions.bottom) {
      // scrolling down
      isVisible.value = false
      if (navbar.value && y.value > navbar.value!.offsetHeight)
        isFixed.value = true
    }
  })
}
</script>

<template>
  <header
    ref="navbar"
    class="fixed w-full left-0 h-20 z-40 bg-white bg-opacity-90 dark:bg-black dark:bg-opacity-90"
    :class="[
      isFixed && '-top-22 left-0 transition duration-300 border-b border-c',
      isVisible && 'translate-y-full shadow-nav',
      !isFixed && !isVisible && 'top-0',
    ]"
  >
    <router-link
      class="w-11 h-11 absolute m-6 select-none outline-none hover:opacity-70 transition-opacity" to="/"
    >
      <img v-show="isDark" src="/logo-dark.svg" alt="logo">
      <img v-show="!isDark" src="/logo-light.svg" alt="logo">
    </router-link>

    <nav class="nav p-8">
      <div class="spacer" />
      <div class="right">
        <router-link to="/posts" title="Blog" class="nav-item">
          <div i-majesticons:paper-fold-text-line class="md:hidden" />
          <span class="lt-md:hidden">Blog</span>
        </router-link>
        <router-link to="/projects" title="Projects" class="nav-item">
          <div i-ph:rocket-launch-duotone class="md:hidden" />
          <span class="lt-md:hidden">Projects</span>
        </router-link>
        <span class="nav-divider" />

        <a href="https://twitter.com/zhengqbbb" target="_blank" title="Twitter">
          <div i-uil:twitter-alt />
        </a>
        <a href="https://www.instagram.com/qbqiubin/" target="_blank" title="Instagram">
          <div i-uil:instagram />
        </a>
        <a rel="noreferrer" href="https://github.com/Zhengqbbb" target="_blank" title="GitHub">
          <div i-uil-github-alt />
        </a>
        <span class="nav-divider" />

        <a title="Toggle Color Scheme" @click="toggleDark()">
          <div i="ri-sun-line dark:ri-moon-line" />
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
logo{
  box-shadow: 2px -1px 1px #4e4e4e, 1px 1px 6px #434343;
    border-radius: 4px;
}
.nav {
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
