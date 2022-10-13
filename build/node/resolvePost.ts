/**
 *  Powered by: https://github.com/Renovamen/renovamen.github.io
 */
import { resolve } from 'pathe'
import fs from 'fs-extra'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import { readingTime } from '.'

export const resolvePostFile = (route: any) => {
  const rPath: string = route.path
  if (
    (!rPath.startsWith('/posts') || rPath === '/posts')
    && !rPath.endsWith('mdtest')
  )
    return

  const path = resolve(__dirname, '../..', route.component.slice(1))
  const md = fs.readFileSync(path, 'utf-8')
  const { content, data } = matter(md)

  route.meta = Object.assign(route.meta || {}, {
    frontmatter: data,
    layout: 'post',
    date: rPath.substring(7, 17) || null,
    readingTime: readingTime(content),
  })

  return route
}

export const resolvePostList = (routes: any[]) => {
  const blogs = routes
    .filter((item: any) => item.meta?.layout === 'post')
    .map((item: any) => ({
      path: item.path,
      title: item.meta.frontmatter.title,
      date: item.meta.date,
    }))
    .sort((a: any, b: any) => dayjs(b.date).unix() - dayjs(a.date).unix())

  return routes.map((item) => {
    const i = blogs.findIndex(blog => blog.path === item.path)

    item.meta = {
      ...item.meta,
      prev: i < blogs.length ? blogs[i + 1] : null,
      next: i > 0 ? blogs[i - 1] : null,
    }

    return item
  })
}
