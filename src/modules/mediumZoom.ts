import { createMediumZoomProvider } from '~/composables/mediumZoom'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app, router }) => {
  createMediumZoomProvider(app, router)
}
