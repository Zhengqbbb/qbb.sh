import type MarkdownIt from 'markdown-it'

/**
 * >md:   `![Image Example](/img/a.gif) <!-- size=1140x245 -->`
 * >html: <img src="/img/a.gif" alt="Image Example" width="1140" height="245" loading="lazy" decoding="async">
 *
 * @author Zhengqbbb
 */
export const image = (md: MarkdownIt) => {
  const imageRender = md.renderer.rules.image!
  md.renderer.rules.image = (...args) => {
    const [tokens, idx] = args
    if (tokens[idx + 2] && /^<!--.*-->/.test(tokens[idx + 2].content)) {
      const data = tokens[idx + 2].content
      if (/size=/.test(data)) {
        const size = data.match(/size=(\d+)(x\d+)?/)
        tokens[idx].attrs?.push(
          [
            'width',
            size?.[1] || '',
          ],
          [
            'height',
            size?.[2]?.substring(1) || size?.[1] || '',
          ],
        )
      }

      tokens[idx].attrs?.push(
        [
          'loading',
          'lazy',
        ],
        [
          'decoding',
          'async',
        ],
      )
      tokens[idx + 2].content = ''
      return imageRender(...args)
    }

    return imageRender(...args)
  }
}

export default image
