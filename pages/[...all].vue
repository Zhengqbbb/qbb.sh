<script setup lang="ts">
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
  <div class="font-bold m-auto text-center">
    <h1 text="5xl" class="mb-8 text-black dark:text-white">
      404
    </h1>
    <p text="4xl">
      {{ getEmoji() }}
    </p>
    <h2 text="2xl" m="t-5 b-8">
      怎么会来到这里 ?
    </h2>
    <RouterLink
      to="/"
      class="text-2xl text-brand underline-none transition-border-color-300"
      border="b brand op-0 hover:op-100"
    >
      ❯ cd /home/
    </RouterLink>
  </div>
</template>
