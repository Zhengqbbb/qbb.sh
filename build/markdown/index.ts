import type MarkdownIt from 'markdown-it'
import Shiki from 'markdown-it-shiki'
import Anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-expect-error missing types
import CheckBox from 'markdown-it-task-checkbox'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
// @ts-expect-error missing types
import Mark from 'markdown-it-mark'
import CodePreWrapperPlugin from './codePreWrap'
import ImagePlugin from './image'
import TableWrapPlugin from './tableWrap'
import ContainerPlugin from './container'
import slugify from './slugify'

export const registerMarkdownPlugins = (md: MarkdownIt) => {
  md.use(Mark)
  md.use(CheckBox)
  md.use(ImagePlugin)
  md.use(TableWrapPlugin)
  md.use(ContainerPlugin)
  md.use(CodePreWrapperPlugin)
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
    includeLevel: [2, 3],
    slugify,
  })
}
