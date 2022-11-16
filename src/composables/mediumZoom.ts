import mediumZoom from 'medium-zoom'
import { inject, nextTick, onMounted } from 'vue'
import type { Zoom } from 'medium-zoom'
import type { App, InjectionKey } from 'vue'
import type { Router } from 'vue-router'
import { isClient } from '~/utils'

declare module 'medium-zoom' {
  interface Zoom {
    refresh: (selector?: string) => void
  }
}

export const mediumZoomSymbol: InjectionKey<Zoom> = Symbol('mediumZoom')

export const useMediumZoom = () => onMounted(() => inject(mediumZoomSymbol)?.refresh())

export const createMediumZoomProvider = (app: App, router: Router) => {
  if (!isClient)
    return
  const zoom = mediumZoom()
  zoom.refresh = () => {
    zoom.detach()
    zoom.attach(':not(a) > img:not(.not-zoom)')
  }
  app.provide(mediumZoomSymbol, zoom)
  router.afterEach(() => nextTick(() => zoom.refresh()))
}
