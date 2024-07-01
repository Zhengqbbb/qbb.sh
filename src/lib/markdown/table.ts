import { visit } from 'unist-util-visit'
import type * as mdast from 'mdast'
import type { RemarkPlugin } from '@astrojs/markdown-remark'

/** For add a wrap to table to horizontal slide */
export function remarkTableWrap(): ReturnType<RemarkPlugin> {
    return (tree: any) => {
        visit(tree, 'table', (tableNode, index, parent) => {
            if (!parent || typeof index !== 'number')
                return

            const wrapedNode: mdast.RootContent[] = [
                {
                    type: 'table',
                    data: {
                        hName: 'div',
                        hProperties: {
                            class: 'table-wrap',
                        },
                    },
                    children: [tableNode],
                },
            ]

            parent.children.splice(index, 1, ...wrapedNode)
        })
    }
}

export default remarkTableWrap
