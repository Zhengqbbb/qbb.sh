import CodeGroup from '~/components/CodeGroup.vue'
import CodeGroupItem from '~/components/CodeGroupItem.vue'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.component('CodeGroup', CodeGroup)
  app.component('CodeGroupItem', CodeGroupItem)
}
