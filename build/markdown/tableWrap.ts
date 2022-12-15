import type MarkdownIt from 'markdown-it'

/**
 * For small screen table can have scroll-x bar
 */
export const tableWrapPlugin = (md: MarkdownIt) => {
  md.renderer.rules.table_open = () => '<div class="table-wrap"><table>'
  md.renderer.rules.table_close = () => '</table></div>'
}

export default tableWrapPlugin
