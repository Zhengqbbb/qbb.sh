<script setup lang="ts">
import { author, email, site } from '~/meta'
</script>

<template>
  <footer
    class="flex items-center flex-col-reverse sm:flex-row lt-sm:gap-4 text-4 my-10 justify-between"
  >
    <div class="op-50 text-sm">
      <a
        class="item"
        target="_blank"
        href="https://creativecommons.org/licenses/by-nc/4.0/"
      >CC BY-NC-SA 4.0</a>
      2023 ©
      <a
        :href="`mailto:${email}`"
        class="item"
      >{{ author }}</a>
    </div>
    <div class="op-70 text-sm">
      <router-link class="item" to="/posts">
        Blog
      </router-link>
      <span> · </span>
      <a
        class="item"
        target="_blank"
        :href="`${site}/feed.xml`"
      >RSS</a>
    </div>
  </footer>
</template>

<style scoped>
footer a.item{
  --at-apply: pb-0.3 border-b border-transparent hover:border-c-fg transition-border-color-300;
}
</style>
