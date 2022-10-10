<script setup lang="ts">
import { onMounted } from 'vue'

defineProps({
  large: {
    type: Boolean,
    default: true,
  },
})
const hellow = 'Hellow'
onMounted(() => {
})
</script>

<template>
  <div>
    <div v-if="large">
      hello
    </div>
    {{ hellow }}
  </div>
</template>

<style lang="scss" scoped></style>
