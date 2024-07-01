import { visit } from 'unist-util-visit'
import { h } from 'hastscript'
import type { RemarkPlugin } from '@astrojs/markdown-remark'

/** @see https://github.com/remarkjs/remark-directive?tab=readme-ov-file#use */
/** For support: :m[hightlight text] => <mark>hightlight text</mark> */
export function remarkMarkEl(): ReturnType<RemarkPlugin> {
    return (tree: any) => {
        visit(tree, 'textDirective', (node) => {
            if (node.name === 'm') {
                const data = node.data || (node.data = {})
                const hast = h(node.name, node.attributes || {}) as any

                data.hName = 'mark'
                data.hProperties = hast.properties
            }
        })
    }
}
export default remarkMarkEl
