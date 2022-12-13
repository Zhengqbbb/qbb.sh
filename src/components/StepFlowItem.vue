<script lang="ts">
export default defineComponent({
  name: 'StepFlowItem',
})
</script>

<script setup lang="ts">
defineProps<{ title: String }>()
</script>

<template>
  <div class="w-full overflow-x-auto">
    <div class="step-flow-title">
      {{ title }}
    </div>
    <div class="step-flow-content">
      <slot />
    </div>
  </div>
</template>
