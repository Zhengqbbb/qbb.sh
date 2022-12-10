import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'pathe'
import fs from 'fs-extra'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { type PropType, createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { parse } from '@vue/compiler-sfc'
// @ts-expect-error missing types
import satori, { init } from 'satori/wasm'
import { html } from 'satori-html'
import initYoga from 'yoga-wasm-web'
import { renderAsync } from '@resvg/resvg-js'
import type { SatoriOptions } from 'satori'
import type { PageFrontmatter } from '../resolvePage'
import { site as siteDefault, description as siteDesc, title as siteName, siteShort } from './meta.mjs'
import type { TemplateTheme } from './type'

const __dirname = dirname(fileURLToPath(import.meta.url))
const __sourceDir = resolve(__dirname, '../../../pages')
const __output = 'public/og'
const __outputDir = resolve(__dirname, `../../../${__output}`)

/**
 * @description: auto generate og image for Build Pre
 * @author Zhengqbbb <https://github.com/Zhengqbbb>
 * @usage pnpm gen:og
 */
export async function genOG() {
  await initEnv()
  const files = fg.sync('**/*.{md,vue}', { cwd: __sourceDir, absolute: true })

  // return await genPNG(await genSVG(siteName, siteDesc, siteShort), resolve(__dirname, './a.png'))
  return await Promise.all(
    files.map(async (p) => {
      const flatPath = p
        .replace(__sourceDir, '')
        .replace(/(\.md|\.vue)$/, '.png')
        .replaceAll('/', '-')
        .substring(1)
        .replace(/(-index\.png)$/, '.png')
      const targetFile = resolve(__outputDir, flatPath)
      if (fs.existsSync(targetFile))
        return false

      const raw = await readFile(p, 'utf-8')
      const { data } = matter(raw)
      const { description, title: pageTitle, desc: descriptionAlias, headerImage } = data as PageFrontmatter
      if (typeof headerImage === 'string')
        return false

      const desc = description || descriptionAlias || siteDesc
      const title = pageTitle || siteName

      await genPNG(await genSVG(title, desc, siteShort), targetFile)
      return flatPath
    }),
  )
}

async function initEnv() {
  // @ts-expect-error missing types
  const yoga = await initYoga(
    await readFile((resolve('node_modules/yoga-wasm-web/dist/yoga.wasm'))),
  )
  init(yoga)
}

async function getTemplateObj(title?: string, desc?: string, site?: string, theme?: TemplateTheme) {
  const { descriptor } = parse(
    await readFile(resolve(__dirname, './Template.vue'), 'utf8'),
  )
  const SFC = createSSRApp(
    {
      props: {
        title: { type: String, default: siteName },
        desc: { type: String, default: siteDesc },
        site: { type: String, default: siteDefault },
        theme: { type: Object as PropType<TemplateTheme> },
      },
      template: descriptor.template?.content ?? '',
    },
    { title, desc, site, theme },
  )
  const rendered = await renderToString(SFC)
  return html(rendered)
}

async function genSVG(title?: string, desc?: string, site?: string) {
  const opt: SatoriOptions = {
    height: 628,
    width: 1200,
    fonts: [
      {
        name: 'Inter',
        data: await readFile(resolve(__dirname, './font/Inter-Medium.woff')),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: await readFile(resolve(__dirname, './font/Inter-Bold.woff')),
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Noto Sans SC',
        data: await readFile(resolve(__dirname, './font/NotoSansSC-Medium.otf')),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Noto Sans SC',
        data: await readFile(resolve(__dirname, './font/NotoSansSC-Bold.otf')),
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Noto Sans Symbols',
        data: await readFile(resolve(__dirname, './font/NotoSansSymbols2-Regular.ttf')),
        weight: 700,
        style: 'normal',
      },
    ],
  }
  return await satori(
    await getTemplateObj(title, desc, site, getTheme()),
    opt,
  )
}

const random = (n: number, m: number) => Math.floor(Math.random() * (m - n + 1) + n)
function getTheme(): TemplateTheme {
  const angle = random(110, 160)
  const bgTWrap = `rgb(${random(0, 10)}, ${random(0, 10)}, ${random(0, 10)})`
  const bgBWrap = `rgb(${random(0, 10)}, ${random(0, 10)}, ${random(0, 10)})`
  const bgTInner = `rgb(${random(10, 25)}, ${random(10, 25)}, ${random(10, 25)})`
  const bgBInner = `rgb(${random(0, 100)}, ${random(0, 100)}, ${random(0, 100)})`
  const holdBG = `background-image: linear-gradient(${angle}deg, ${bgTWrap}, ${bgTInner} 30%, ${bgBInner} 70%, ${bgBWrap});`
  const holdFG = 'color: #ffffff;'
  return {
    wholeDivStyle: holdBG + holdFG,
  }
  // DEBUG
  return {
    wholeDivStyle: 'background-image: linear-gradient(120deg, rgb(8, 5, 3), rgb(19, 19, 18) 30%, rgb(65, 65, 65) 70%, rgb(19, 20, 20));color: #ffffff;',
  }
}

async function genPNG(svg: string, output: string) {
  const render = await renderAsync(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  })
  return await writeFile(output, render.asPng())
}

(async function () {
  /* eslint-disable no-console */
  const start = new Date().getTime()
  console.log('\x1B[90m[build-prepare] \x1B[33mGenerate Open Gragh Image ...\x1B[0m')

  const images = await genOG()

  console.log('\x1B[32m✓\x1B[0m Generat Open Gragh Image')
  images.filter(Boolean).forEach((i) => {
    console.log(`\x1B[90m${__output}/\x1B[36m${i}\x1B[0m`)
  })
  console.log(`  \x1B[90mGenerate Open Gragh Image in ${((Date.now() - start) / 1000).toFixed(2)}s\x1B[0m`)
}()).catch((err) => {
  console.error(err)
  process.exit(1)
})
