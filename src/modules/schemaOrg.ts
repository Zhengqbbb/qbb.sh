import { type UserModule } from '~/types'
import { site } from '~/meta'

export const install: UserModule = async (ctx) => {
  // Disables on client build, allows 0kb runtime
  if (ctx.isClient && import.meta.env.PROD)
    return

  const { SchemaOrgUnheadPlugin } = await import('@vueuse/schema-org')
  ctx.head!.use(SchemaOrgUnheadPlugin({
    host: site,
  }, () => {
    return {
      path: ctx.router.currentRoute.value.path,
      ...ctx.router.currentRoute.value.meta,
    }
  }))
}
