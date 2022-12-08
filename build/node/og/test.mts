/**
 * @description: To Test tool package's concurrent ability
 * @use `time tsx build/node/og/test.cts`
 */

/* eslint-disable no-console */
import { renderAsync } from '@resvg/resvg-js'
// import sharp from 'sharp'

const svg = '<svg width="1200" height="628" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 628" fill="#000"><path d="M37.59.25l36.95 64H.64l36.95-64z"></path></svg>'

export async function genPNG(svg: string) {
  // slow. not support https://github.com/yisibl/resvg-js/issues/171
  const render = await renderAsync(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  })
  return render.asPng()

  // can't render innner svg
  // return await sharp(Buffer.from(svg))
  //   .resize(1200, 630)
  //   .png()
  //   .toBuffer()
}

(async function () {
  const mock = new Array(1000).fill(null)
  console.log('`sharp` Current Test Concurrent Length: ', mock.length)
  Promise.all(mock.map(_ => genPNG(svg)))
}()).catch((err) => {
  console.error(err)
  process.exit(1)
})
