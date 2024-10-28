import type { Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import Meta from '../../meta'

const rehypeImageCDN: Plugin<[], Root> = () => {
    return (tree) => {
        visit(tree, 'element', (node) => {
            if (
                node.tagName === 'img'
                && node.properties
                && typeof node.properties.src === 'string'
                && import.meta.env?.PROD
            ) {
                const src = node.properties.src
                if (src.startsWith('/image/')) {
                    node.properties.src = Meta.cdnUrl + src
                }
            }
        })
    }
}

export default rehypeImageCDN
