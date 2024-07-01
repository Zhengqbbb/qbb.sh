import { visit } from 'unist-util-visit'
import type * as mdast from 'mdast'
import type { RemarkPlugin } from '@astrojs/markdown-remark'

function calcSize(size: string) {
    const tmp = size.split('x')
    return tmp.length === 1
        ? { width: tmp[0], height: tmp[0] }
        : { width: tmp[0], height: tmp[1] }
}

/**
 * @description Using directive syntax to enhance the functionality of markdown images
 * @see https://github.com/remarkjs/remark-directive?tab=readme-ov-file#use
 * @see https://qbb.sh/posts/hi#images
 * @author Zhengqbbb
 * @example
 *
 * ![Image Example](/image/astro.webp)
 * :f
 * ====> only add lazy loading, onload, onerror, initalClass, and skeleton wrap with figure
 *
 * ![Image Example](/image/astro.webp)
 * :f{.no-zoom.m-auto fclass=m-auto size=200}
 * ====> extra add size to width, hight and class "no-zoom m-auto" to image and "m-auto" to figure
 *
 * ![Image Example](/image/astro.webp)
 * :f[Picture from [Astro Together 2024](https://astro.build/blog/astro-together-montreal/) • June 2024]{.no-zoom}
 * ====> extra add caption to figcaption and class "no-zoom" to image
 */
export function remarkImage(): ReturnType<RemarkPlugin> {
    /* @unocss-include */
    return (tree: any) => {
        visit(tree, 'image', (imageNode, imageIdx, parent) => {
            if (!parent || typeof imageIdx !== 'number')
                return
            const directiveIdx = parent.children.findIndex((c: any) => c.type === 'textDirective' && c.name === 'f')
            if (directiveIdx === -1)
                return

            const directiveNode = parent.children[directiveIdx]
            const directiveNodeAttrs = directiveNode?.attributes || {}
            imageNode.data ??= {}
            // #region - Inject lazy loading, onload, onerror, initalClass
            imageNode.data.hProperties = {
                class: 'image-loaded image-unloaded',
                loading: 'lazy',
                decoding: 'async',
                onload: 'window?.cImageOnLoad?.call(this)',
                onerror: 'window?.cImageOnError?.call(this)',
            }
            // #endregion
            // #region - Handle attributes and size to width, hight
            let figClass = ' '
            for (const attr in directiveNodeAttrs) {
                if (attr === 'size') {
                    const { width, height } = calcSize(directiveNodeAttrs[attr])
                    imageNode.data.hProperties.width = width
                    imageNode.data.hProperties.height = height
                    delete directiveNodeAttrs[attr]
                }
                else if (attr === 'fclass') {
                    figClass += directiveNodeAttrs[attr]
                    delete directiveNodeAttrs[attr]
                }
                else {
                    imageNode.data.hProperties[attr] ??= ''
                    imageNode.data.hProperties[attr] += ` ${directiveNodeAttrs[attr]}`
                }
            }
            // #endregion
            // #region - Make a skeleton wrap div
            const baseWrapClass = 'relative overflow-hidden before:content-empty before:absolute before:inset-0 before:c-sk before:rd'
            const wrapedImageNode: mdast.RootContent = {
                // inject skeleton
                type: 'paragraph',
                data: {
                    hName: 'div',
                    hProperties: {
                        class: baseWrapClass,
                        alt: imageNode.alt, // for error image alt inject

                    },
                },
                children: [imageNode],
            }
            // #endregion

            // #region - Handle caption transform to figcaption
            const directiveNodeCaption = directiveNode?.children
            let figcaptionNode: null | mdast.RootContent = null
            if (Array.isArray(directiveNodeCaption) && directiveNodeCaption.length > 0) {
                figcaptionNode = {
                    type: 'paragraph',
                    data: { hName: 'figcaption' },
                    children: directiveNodeCaption,
                }
            }
            // #endregion

            parent.data ??= {}
            parent.data.hName = 'figure'
            parent.data.hProperties ??= {}
            parent.data.hProperties.class = figClass
            parent.children = figcaptionNode
                ? [wrapedImageNode, figcaptionNode]
                : [wrapedImageNode]
        })
    }
}
export default remarkImage
