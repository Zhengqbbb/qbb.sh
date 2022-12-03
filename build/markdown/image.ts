import type MarkdownIt from 'markdown-it'

/**
 * >>>Markdown:   `![Image Example](/image/a.gif) <!-- size=1140x245 -->`
 * >>>HTML:       <figure><img src="/image/a.gif" alt="Image Example" width="1140" height="245" loading="lazy" decoding="async"></figure>
 *
 * @usage
 * `![Image Example](/image/a.png) <!-- -->`                    use lazy attrs
 * `![Image Example](/image/a.gif) <!-- ! -->`                  not zoom. use lazy attrs
 * `![Image Example](/image/a.png) <!-- size=200 -->`           use lazy attrs. width 200. height 200.
 * `![Image Example](/image/a.gif) <!-- size=900x220 -->`       use lazy attrs. width 900. height 220.
 * @author Zhengqbbb
 */
export const ImagePlugin = (md: MarkdownIt) => {
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

      if (/^<!-- \!/.test(data)) {
        const classIdx = tokens[idx].attrs?.findIndex(i => i?.[0] === 'class')
        classIdx === undefined || classIdx === -1
          ? tokens[idx].attrs?.push(['class', 'not-zoom'])
          : tokens[idx].attrs?.[classIdx][1].concat(' not-zoom')
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
        [
          'onerror',
          'this.parentElement.classList.add(\'error\');',
        ],
        [
          // For ios. Prevent medium-zoom from reloading
          'onload',
          'this.removeAttribute(\'loading\');',
        ],
      )
      tokens[idx + 2].content = ''

      const alt = tokens[idx].content
      const rawCode = imageRender(...args)
      return `<figure alt="${alt}">
      ${rawCode}
      </figure>`
    }
    return imageRender(...args)
  }
}

export default ImagePlugin
