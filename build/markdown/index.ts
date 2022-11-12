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
import ContainerPlugin from './container'
import ImagePlugin from './image'
import slugify from './slugify'

export const registerMarkdownPlugins = (md: MarkdownIt) => {
  md.use(CodePreWrapperPlugin)
  md.use(ContainerPlugin)
  md.use(ImagePlugin)
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
  md.use(CheckBox)
}
