import type { RehypePlugins, RemarkPlugins } from 'astro'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGithubAlerts from 'remark-github-alerts'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'

export const remarkPlugins: RemarkPlugins = [
    remarkGithubAlerts,
]

export const rehypePlugins: RehypePlugins = [
    [rehypeExternalLinks, { target: '_blank', rel: 'noreferrer' }],
    rehypeHeadingIds,
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
