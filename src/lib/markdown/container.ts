import { visit } from 'unist-util-visit'
import type * as mdast from 'mdast'
import type { RemarkPlugin } from '@astrojs/markdown-remark'

/** @see https://github.com/remarkjs/remark-directive?tab=readme-ov-file#use */
export function remarkContainer(): ReturnType<RemarkPlugin> {
    return (tree: any) => {
        visit(tree, 'containerDirective', (node) => {
            if (['info', 'tip', 'warning', 'danger', 'details'].includes(node.name)) {
                const data = node.data || (node.data = {})
                const children = node.children
                data.hProperties = { class: ['custom-block', node.name] }
                data.hName = node.name === 'details' ? 'details' : 'div'
                let title = node.name.toUpperCase()

                const hasCustomTitle = !!children[0]?.data?.directiveLabel
                if (hasCustomTitle) {
                    title = (children[0] as mdast.Paragraph).children
                    children.shift()
                }

                const titleNode: mdast.Paragraph = {
                    type: 'paragraph',
                    data: {
                        hName: node.name === 'details' ? 'summary' : 'p',
                        hProperties: { class: 'custom-block-title' },
                    },
                    children: hasCustomTitle
                        ? title
                        : [{ type: 'text', value: title }],
                }

                children.unshift(titleNode)
            }
        })
    }
}
export default remarkContainer
