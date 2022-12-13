<script lang="tsx">
import type { Component, PropType } from 'vue'
export default defineComponent({
  name: 'StepFlow',
  props: {
    type: String as PropType<'ul' | 'ol'>,
  },
  setup(props, { slots }) {
    return () => {
      const items = (slots.default?.() ?? [])
        .filter(vnode => (vnode.type as Component).name === 'StepFlowItem')
        .map((vnode) => {
          vnode.props = vnode.props ?? {}
          return vnode
        })

      return (
        <div class={['step-flow', props.type]}>
          {
            items.map((item, index) => (
              <div class='step-flow-item' data-step={index + 1}>
                {item}
              </div>
            ))
          }
        </div>
      )
    }
  },
})
</script>
