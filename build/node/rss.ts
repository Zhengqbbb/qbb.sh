import { resolve } from 'pathe'
import fs from 'fs-extra'
import fg from 'fast-glob'
import matter from 'gray-matter'
import chalk from 'chalk'
import type { Author, FeedOptions } from 'feed'
import { Feed } from 'feed'
import type { PageFrontmatter } from './resolvePage'
import { author, email, ogImg, site, description as siteDesc, title as siteTitle } from '~/meta'
import { isExternal } from '~/utils'

const __sourceDir = resolve(__dirname, '../../pages/posts')
const __output = 'dist/'
const __outputDir = resolve(__dirname, '../../', __output)

/**
 * @description: generate RSS of build post
 * @author Zhengqbbb <https://github.com/Zhengqbbb>
 * @usage pnpm gen:rss
 * @see https://www.qbb.sh/feed.xml
 */
export async function generateRSS() {
  const posts = await fg('**/*.md', { cwd: __sourceDir, ignore: ['index.md'] })
  if (posts.length === 0)
    return

  const baseOps: FeedOptions = {
    title: siteTitle,
    description: siteDesc,
    id: site,
    link: site,
    author: { name: author, link: site, email },
    copyright: `CC BY-NC-SA 4.0 2022 © ${author}`,
    feedLinks: {
      json: `${site}/feed.json`,
      atom: `${site}/feed.atom`,
      rss: `${site}/feed.xml`,
    },
    favicon: `${site}/logo.png`,
    image: ogImg,
  }
  const feed = new Feed(baseOps)
  await Promise.all(
    posts.map(async (p) => {
      const date = p.substring(0, 10)
      const raw = await fs.readFile(`${__sourceDir}/${p}`)
      const { data } = matter(raw)
      const { description, title: pageTitle, desc: descriptionAlias, headerImage } = data as PageFrontmatter
      let image = ogImg
      if (headerImage)
        image = isExternal(headerImage) ? headerImage : site + headerImage

      feed.addItem({
        ...baseOps,
        image,
        author: [baseOps.author as Author],
        title: pageTitle,
        date: new Date(date),
        description: description || descriptionAlias || siteDesc,
        id: `${site}/posts/${p.replace(/\.md?/, '')}`,
        link: `${site}/posts/${p.replace(/\.md?/, '')}`,
      })
    }),
  )
  await fs.ensureDir(__outputDir)
  await fs.writeFile(resolve(__outputDir, 'feed.xml'), feed.rss2(), 'utf-8')
  await fs.writeFile(resolve(__outputDir, 'feed.atom'), feed.atom1(), 'utf-8')
  await fs.writeFile(resolve(__outputDir, 'feed.json'), feed.json1(), 'utf-8')
  return [
    'feed.xml',
    'feed.atom',
    'feed.json',
  ]
}

(async function () {
  /* eslint-disable no-console */
  const start = new Date().getTime()
  console.log(`${chalk.gray('[build-post]')} ${chalk.yellow('Generate posts RSS ...')}`)

  const files = await generateRSS()
  files?.filter(Boolean).forEach((i) => {
    console.log(`${chalk.gray(__output)}${chalk.cyan(i)}`)
  })

  console.log(`${chalk.green('✓')} Generate posts RSS`)
  console.log(`  ${chalk.gray(`Generate posts RSS in ${((Date.now() - start) / 1000).toFixed(2)}s`)}`)
}()).catch((err: Error) => {
  console.error(err)
  process.exit(1)
})
