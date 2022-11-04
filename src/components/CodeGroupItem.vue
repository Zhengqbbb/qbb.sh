<script lang="ts">
export default defineComponent({
  name: 'CodeGroupItem',
})
</script>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <div v-show="active" class="code-group-item">
    <slot />
  </div>
</template>
