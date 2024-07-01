import { visit } from 'unist-util-visit'
import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { h } from 'hastscript'

/** @see https://github.com/remarkjs/remark-directive?tab=readme-ov-file#use */
/** For support: :i{carbon:logo-github} */
export function remarkIcon(): ReturnType<RemarkPlugin> {
    return (tree: any) => {
        visit(tree, 'textDirective', (node) => {
            if (node.name === 'i') {
                const data = node.data || (node.data = {})
                const hast = h(node.name, node.attributes || {}) as any
                data.hName = hast.tagName
                for (const propert in hast.properties) {
                    if (propert.includes(':') && !propert.startsWith('i-')) {
                        hast.properties.className ??= ''
                        hast.properties.className += ` i-${propert}`
                        delete hast.properties[propert]
                    }
                }
                data.hProperties = hast.properties
            }
        })
    }
}
export default remarkIcon
