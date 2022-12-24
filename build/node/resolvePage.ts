/**
 * @PoweredBy https://github.com/Renovamen/renovamen.github.io
 * @description: generate post page meta data for `useRoute().meta`
 * @return { meta: PageMeta }
 */

import { resolve } from 'pathe'
import fs from 'fs-extra'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import type { RouteMeta, RouteRecordNormalized } from 'vue-router'
import { ogImg } from '../../src/meta'
import { type ReadingTime, readingTime } from './readingTime'

export interface PostPager {
  path: string
  title: string
  description: string
  headerImage: string
  date: string
  readingTime: ReadingTime
}

export interface PageFrontmatter {
  /**
   * using page title and og:title
   */
  title: string
  /**
   * using page description and og:description
   * `desc` is alias for `description`
   */
  description?: string
  desc?: string
  /**
   * Use custom header image for og:image
   */
  headerImage?: string
}

export interface PageMeta extends RouteMeta {
  frontmatter: PageFrontmatter
  layout: 'post'
  /**
   * @example: 2022-08-24-helloworld.md => '2022-08-24'
   */
  date: string | null
  readingTime: ReadingTime
  prev: PostPager | null
  next: PostPager | null
}

export interface PostRouterRecord extends RouteRecordNormalized {
  title: string
  dateText: string
  readingTimeText: number
  meta: PageMeta
}

export const resolvePageFile = (route: any) => {
  const routePath: string = route.path
  const isPost = routePath.startsWith('/posts') && routePath !== '/posts'

  const path = resolve(__dirname, '../..', route.component.slice(1))
  const mdData = fs.readFileSync(path, 'utf-8')
  const { content, data } = matter(mdData)

  route.meta = Object.assign(route.meta || {}, {
    frontmatter: data,
    layout: isPost ? 'post' : 'default',
    date: routePath.substring(7, 17) || null,
    readingTime: readingTime(content),
  } as PageMeta)

  return route
}

/**
 * @description: generated Posts List for page use
 */
export const resolvePostList = (routes: any[]) => {
  const blogs = routes
    .filter((item: any) => item.meta?.layout === 'post')
    .map((item: any) => ({
      path: item.path,
      title: item.meta.frontmatter.title,
      description: item.meta.frontmatter.description ?? item.meta.frontmatter.desc ?? '',
      headerImage: item.meta.frontmatter.headerImage ?? ogImg,
      date: item.meta.date,
      readingTime: item.meta.readingTime,
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
    } as PageMeta

    return item
  })
}
