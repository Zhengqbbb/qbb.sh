/**
 * Resolve png jpeg jpg ... To webp srcipt
 * Gen og png image thin
 *
 * @usage pnpm image
 * @usage pnpm image [--clear|-c]
 *   : To clear origin assert
 *
 * @author Zhengqbbb <https://github.com/Zhengqbbb>
 */

import fg from 'fast-glob'
import { resolve } from 'pathe'
// @ts-expect-error missing types
import imagemin from 'imagemin'
// @ts-expect-error missing types
import imageminWebp from 'imagemin-webp'
import rm from 'rimraf'
// import imageminOptipng from 'imagemin-optipng'

const __ASSERT_DIR = resolve(__dirname, '../../public/image')

async function run() {
  await imagemin([`${__ASSERT_DIR}/*.{png,jpeg,jpg}`], {
    destination: __ASSERT_DIR,
    plugins: [
      imageminWebp({ quality: 80 }),
    ],
  })
  const imagesFolderDir = await fg('*', { cwd: __ASSERT_DIR, absolute: true, onlyDirectories: true })
  return Promise.all(
    imagesFolderDir.map(async (folderDir) => {
      await imagemin([`${folderDir}/*.{png,jpeg,jpg}`], {
        destination: folderDir,
        plugins: [
          imageminWebp({ quality: 80 }),
        ],
      })
    }),
  )
  // await imagemin(['public/og/*.png'], {
  //   destination: 'public/og',
  //   plugins: [
  //     imageminOptipng(),
  //   ],
  // })
}

async function clear() {
  const images = await fg('**/*.{png,jpeg,jpg}', { cwd: __ASSERT_DIR, absolute: true })
  images.forEach((p) => {
    rm.sync(p)
  })
}

(async function () {
  /* eslint-disable no-console */
  const start = new Date().getTime()
  console.log('\x1B[90m[build-prepare] \x1B[33mResolve Compress Images Assert ...\x1B[0m')

  await run()
  if (process.argv.some(i => /^(--clear|-c)/.test(i)))
    await clear()

  console.log('\x1B[32m✓\x1B[0m Resolve Compress Images Assert')
  console.log(`  \x1B[90mCompress Images Assert in ${((Date.now() - start) / 1000).toFixed(2)}s.\x1B[0m\n`)
}()).catch((err: Error) => {
  console.error(err)
  process.exit(1)
})
