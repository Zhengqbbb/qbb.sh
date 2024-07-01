import type { RehypePlugins, RemarkPlugins } from 'astro'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGithubAlerts from 'remark-github-alerts'
import remarkDirective from 'remark-directive'
import remarkContainer from './container'
import remarkIcon from './icon'
import remarkMarkEl from './mark'
import remarkTableWrap from './table.ts'
import remarkImage from './image.ts'

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
