import type MarkdownIt from 'markdown-it'
import Anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-expect-error missing types
import CheckBox from 'markdown-it-task-checkbox'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
// @ts-expect-error missing types
import Mark from 'markdown-it-mark'
import CodeBlockWrapPlugin from './codeWrap'
import ImagePlugin from './image'
import TableWrapPlugin from './tableWrap'
import ContainerPlugin from './container'
import highlightLinesPlugin from './highlightLines'
import slugify from './slugify'

export * from './shiki'
export function registerMarkdownPlugins(md: MarkdownIt) {
  md.use(Mark)
  md.use(CheckBox)
  md.use(ImagePlugin)
  md.use(highlightLinesPlugin)
  md.use(TableWrapPlugin)
  md.use(CodeBlockWrapPlugin)
  md.use(ContainerPlugin)

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
