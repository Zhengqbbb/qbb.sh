import type { RehypePlugins, RemarkPlugins } from 'astro'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import remarkDirective from 'remark-directive'
import remarkGithubAlerts from 'remark-github-alerts'
import remarkContainer from './container'
import remarkIcon from './icon'
import remarkImage from './image.ts'
import rehypeImageCDN from './imageCDN.ts'
import remarkMarkEl from './mark'
import remarkTableWrap from './table.ts'

export const remarkPlugins: RemarkPlugins = [
    remarkDirective,
    remarkGithubAlerts,
    remarkContainer,
    remarkIcon,
    remarkMarkEl,
    remarkTableWrap,
    remarkImage,
]

export const rehypePlugins: RehypePlugins = [
    [rehypeExternalLinks, { target: '_blank', rel: 'noreferrer' }],
    rehypeHeadingIds,
    rehypeImageCDN,
    [
        rehypeAutolinkHeadings,
        {
            properties: {
                ariaHidden: 'true',
                tabIndex: -1,
                class: 'header-anchor',
            },
            content: {
                type: 'text',
                value: '#',
            },
        },
    ],
]
