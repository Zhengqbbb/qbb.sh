import { execSync } from 'child_process'
import fs from 'fs-extra'
import { resolve } from 'pathe'
import chalk from 'chalk'
import { SitemapStream } from 'sitemap'
import fg from 'fast-glob'
import { lang, site } from '~/meta'

const __sourceDir = resolve(__dirname, '../../pages/')
const __output = 'dist/'
const __outputDir = resolve(__dirname, '../../', __output)

/**
 * @description: generate sitemap of build post
 * @author Zhengqbbb <https://github.com/Zhengqbbb>
 * @usage pnpm gen:sitemap
 * @see https://www.qbb.sh/sitemap.xml
 */
async function generateSitemap() {
  const pages = await fg('**/*.{vue,md}', { cwd: __sourceDir, ignore: ['*...all*.vue'] })
  const pageData = await Promise.all(
    pages.map(async (page) => {
      const p = page.replace(/\.(md)?(vue)?$/g, '')
      return {
        url: `${site}/${
          p.endsWith('index')
            ? p.replace(/\/?index$/, '')
            : p
        }`,
        lastmod: getGitTimestamp(resolve(__sourceDir, page)),
        priority: p === 'index'
          ? 1
          : p.startsWith('posts/')
            ? 0.8
            : 0.6,
        changefreq: 'daily',
        lang,
      }
    }),
  )

  await fs.ensureDir(__outputDir)
  const smStream = new SitemapStream({
    hostname: site,
  })
  const writeStream = fs.createWriteStream(
    resolve(__outputDir, 'sitemap.xml'),
  )
  smStream.pipe(writeStream)
  pageData.forEach(mapping => smStream.write(mapping))
  smStream.end()

  const robotsText = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`
  await fs.writeFile(resolve(__outputDir, 'robots.txt'), robotsText, 'utf-8')

  return [
    'sitemap.xml',
    'robots.txt',
  ]
}

function getGitTimestamp(file: string) {
  const output = execSync(`git log -1 --pretty='%ci' ${file} || true`).toString().trim()
  return output ? new Date(output).toISOString() : new Date().toISOString()
}

(async function () {
  /* eslint-disable no-console */
  const start = new Date().getTime()
  console.log(`${chalk.gray('[build-post]')} ${chalk.yellow('Generate website sitemap ...')}`)

  const files = await generateSitemap()
  files?.filter(Boolean).forEach((i) => {
    console.log(`${chalk.gray(__output)}${chalk.cyan(i)}`)
  })

  console.log(`${chalk.green('✓')} Generate website sitemap`)
  console.log(`  ${chalk.gray(`Generate website sitemap in ${((Date.now() - start) / 1000).toFixed(2)}s`)}`)
}()).catch((err: Error) => {
  console.error(err)
  process.exit(1)
})
