import type MarkdownIt from 'markdown-it'
import Shiki from 'markdown-it-shiki'
import Anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
// @ts-expect-error missing types
import Mark from 'markdown-it-mark'
import { codePreWrapperPlugin } from './codePreWrap'
import { containerPlugin } from './container'
import { slugify } from './slugify'

export const registerMarkdownPlugins = (md: MarkdownIt) => {
  md.use(codePreWrapperPlugin)
  md.use(containerPlugin)
  md.use(Shiki, {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  })
  md.use(Anchor, {
    slugify,
    permalink: Anchor.permalink.linkInsideHeader({
      symbol: '#',
      renderAttrs: () => ({ 'aria-hidden': 'true' }),
    }),
  })
  md.use(LinkAttributes, {
    matcher: (link: string) => /^https?:\/\//.test(link),
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  })
  md.use(TOC, {
    includeLevel: [1, 2, 3],
    slugify,
  })
  md.use(Mark)
}
