import fg from 'fast-glob'
import { resolve } from 'pathe'
// @ts-expect-error missing types
import imagemin from 'imagemin'
// @ts-expect-error missing types
import imageminWebp from 'imagemin-webp'
// @ts-expect-error missing types
import rm from 'rimraf'

/*
 * Resolve png jpeg jpg ... To webp srcipt
 * pnpm img:webp
 */
const __ASSERT_DIR = resolve(__dirname, '../../public/img')
const run = async () => {
  await imagemin([`${__ASSERT_DIR}/*.{jpg,png}`], {
    destination: __ASSERT_DIR,
    plugins: [
      imageminWebp({ quality: 80 }),
    ],
  })
}

const clear = async () => {
  const images = await fg('**/*.{png,jpeg,jpg}', { cwd: __ASSERT_DIR, absolute: true })
  images.forEach((p) => {
    rm.sync(p)
  })
}

/* eslint-disable no-console */
run()
  .then(() => {
    if (process.env.IS_CLEAR)
      clear()
  })
  .then(() => {
    setTimeout(() => {
      console.log('\x1B[32m✓\x1B[0m Resolve images assert to webp')
    })
  })
