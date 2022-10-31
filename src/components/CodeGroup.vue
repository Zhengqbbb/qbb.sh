<script lang="tsx">
import type { Component } from 'vue'
export default defineComponent({
  name: 'CodeGroup',
  setup(_, { slots }) {
    const currentIndex = ref(0)
    return () => {
      // use jsx instead of template because we need to change slots
      // so jsx can handle. But template can't do it
      const items = (slots.default?.() ?? [])
        .filter(vnode => (vnode.type as Component).name === 'CodeGroupItem')
        .map((vnode) => {
          vnode.props = vnode.props ?? {}
          return vnode
        })

      items.forEach((item, index) => {
        item.props!.active = index === currentIndex.value
      })

      return (
        <div class="code-group">
          <div class="code-header">
            {
              items.map((item, index) => (
              <div
                class={[
                  'code-header-item',
                  { active: index === currentIndex.value },
                ]}
                onClick={() => (currentIndex.value = index)}
              >
                {item.props?.title}
              </div>
              ))
            }
          </div>
          {items}
        </div>
      )
    }
  },
})
</script>
