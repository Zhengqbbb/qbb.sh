<script setup lang="ts">
import { isDark } from '~/composables'
</script>

<template>
  <header class="header z-40">
    <router-link class="w-11 h-11 absolute lg:fixed m-6 select-none outline-none" to="/">
      <img v-show="isDark" src="/logo-dark.svg" alt="logo">
      <img v-show="!isDark" src="/logo-light.svg" alt="logo">
    </router-link>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <a href="https://twitter.com/zhengqbbb" target="_blank" title="Twitter" class="lt-md:hidden">
          <div i-uil:twitter-alt />
        </a>
        <a rel="noreferrer" href="https://github.com/Zhengqbbb" target="_blank" title="GitHub" class="lt-md:hidden">
          <div i-uil-github-alt />
        </a>
        <a title="Toggle Color Scheme" class="lt-md:hidden" @click="toggleDark()">
          <div i="carbon-sun dark:carbon-moon" />
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
  padding: 2rem;
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
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
