<script setup lang="ts">
import { isClient } from '~/utils'

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
      if (navbar.value && y.value > 2)
        isLeave.value = true
    }
  })
}
</script>

<template>
  <header
    ref="navbar"
    class="c-select-none fixed -top-22 w-full left-0 h-20 z-40 bg-white bg-opacity-90 dark:bg-black dark:bg-opacity-90"
    :class="[
      isLeave && 'transition duration-300 border-b border-c',
      isVisible && 'translate-y-full shadow-nav',
      !isLeave && !isVisible && 'top-0',
    ]"
  >
    <div class="m-a max-w-120ch">
      <router-link
        class="w-11 h-11 absolute m-6 outline-none hover:opacity-70 transition-opacity" to="/"
      >
        <img v-show="isDark" src="/logo-dark.svg" alt="logo">
        <img v-show="!isDark" src="/logo-light.svg" alt="logo">
      </router-link>

      <nav class="nav p-8">
        <div class="spacer" />
        <div class="right grid-gap-4 lt-sm:grid-gap-3.2">
          <router-link to="/posts" title="Blog" class="nav-item">
            <div i-majesticons:paper-fold-text-line class="md:hidden" />
            <span class="lt-md:hidden select-text">Blog</span>
          </router-link>
          <router-link to="/projects" title="Projects" class="nav-item">
            <div i-ph:rocket-launch-duotone class="md:hidden" />
            <span class="lt-md:hidden select-text">Projects</span>
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
    </div>
  </header>
</template>

<style scoped>
.c-select-none{
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
