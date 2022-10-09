<script setup lang="ts">
/** Powered by: https://github.com/Renovamen/renovamen.github.io  */
const emojiArray = [
  '\\(o_o)/',
  '(o^^)o',
  '(˚Δ˚)b',
  '(^-^*)',
  '(^_^)b',
  '(╯‵□′)╯',
  '(=\'X\'=)',
  '(>_<)',
  '\\(°ˊДˋ°)/',
  'ㄟ(▔▽▔)ㄏ',
]

const getEmoji = (): string =>
  emojiArray[Math.floor(Math.random() * emojiArray.length)]
</script>

<template>
  <div class="font-bold absolute top-1/3 -mt-24 left-0 right-0 text-center">
    <h1 text="5xl" class="mb-8 text-black dark:text-white">
      404
    </h1>
    <p text="4xl">
      {{ getEmoji() }}
    </p>
    <h2 text="2xl" m="t-5 b-8">
      How did we get here ?
    </h2>
    <RouterLink to="/" class="text-2xl text-brand hover:underline">
      ❯ cd /home/
    </RouterLink>
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
