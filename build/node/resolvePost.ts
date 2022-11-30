/**
 * @PoweredBy https://github.com/Renovamen/renovamen.github.io
 * @description: generate post page meta data for `useRoute().meta`
 * @return { meta: RouterMeta }
 */

import { resolve } from 'pathe'
import fs from 'fs-extra'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import type { RouteMeta } from 'vue-router'
import { type ReadingTime, readingTime } from './readingTime'

export interface PostFrontmatter {
  /**
   * using page title and og:title
   */
  title?: string
  /**
   * using page description and og:description
   * `desc` is alias for `description`
   */
  description?: string
  desc?: string
  /**
   * not use auto gen og:img. Use custom header image
   */
  headerImage?: string
}

export interface PostPager {
  path: string
  title: string
  description: string
  headerImage: string
  date: string
  readingTime: ReadingTime
  lang: 'zh' | 'en'
}

export interface PostMeta extends RouteMeta {
  frontmatter: PostFrontmatter
  layout: 'post'
  /**
   * @example: 2022-08-24-helloworld.md => '2022-08-24'
   */
  date: string | null
  readingTime: ReadingTime
  lang: 'zh' | 'en'
  prev: PostPager | null
  next: PostPager | null
}

export const resolvePostFile = (route: any) => {
  const routePath: string = route.path
  if (!routePath.startsWith('/posts') || routePath === '/posts')
    return

  const path = resolve(__dirname, '../..', route.component.slice(1))
  const mdData = fs.readFileSync(path, 'utf-8')
  const { content, data } = matter(mdData)

  route.meta = Object.assign(route.meta || {}, {
    frontmatter: data,
    layout: 'post',
    date: routePath.substring(7, 17) || null,
    readingTime: readingTime(content),
    lang: routePath.endsWith('zh') ? 'zh' : 'en',
  } as PostMeta)

  return route
}

/**
 * @description: generated Posts List for page use
 * @return {*}
 */
export const resolvePostList = (routes: any[]) => {
  const blogs = routes
    .filter((item: any) => item.meta?.layout === 'post')
    .map((item: any) => ({
      path: item.path,
      title: item.meta.frontmatter.title,
      description: item.meta.frontmatter.description ?? item.meta.frontmatter.desc ?? '',
      headerImage: item.meta.frontmatter.headerImage ?? `/og/${item.name}.png`,
      date: item.meta.date,
      readingTime: item.meta.readingTime,
      lang: item.meta.lang,
    }))
    .sort((a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix())

  return routes.map((item) => {
    const i = blogs.findIndex(blog => blog.path === item.path)
    if (i === -1)
      return item

    item.meta = {
      ...item.meta,
      prev: i < blogs.length ? blogs[i + 1] ?? null : null,
      next: i > 0 ? blogs[i - 1] ?? null : null,
    } as PostMeta

    return item
  })
}
