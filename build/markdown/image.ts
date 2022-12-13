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
 * `![Image Example](/image/a.gif) <!-- size=900x220 text=hello world. by[@hello](http:...) -->`.
 *  use lazy attrs. width 900. height 220. figcaption<image description>: hello world.<a href="http:...">@hello</a>
 * @author Zhengqbbb <https://github.com/Zhengqbbb>
 */
export const ImagePlugin = (md: MarkdownIt) => {
  const imageRE = /^<!-- (?<size>size=(\d+)(x\d+)?)? ?(?<notZoom>!)? ?(?<class>class=".*")? ?(?<text>text=.+)? ?-->/i
  const sizeRE = /size=(?<width>\d+)(?<height>x\d+)?/i

  const imageRender = md.renderer.rules.image!

  md.renderer.rules.image = (...args) => {
    const [tokens, idx] = args
    const match = tokens[idx + 2] ? tokens[idx + 2].content.match(imageRE) : null
    if (match) {
      if (match.groups?.size) {
        const sizeMatch = match.groups.size.match(sizeRE)
        tokens[idx].attrs?.push(
          [
            'width',
            sizeMatch?.groups?.width || '',
          ],
          [
            'height',
            sizeMatch?.groups?.height?.substring(1) || sizeMatch?.groups?.width || '',
          ],
        )
      }

      if (match.groups?.notZoom) {
        const imageClass = tokens[idx].attrs?.findIndex(i => i?.[0] === 'class')
        imageClass === undefined || imageClass === -1
          ? tokens[idx].attrs?.push(['class', 'not-zoom'])
          : tokens[idx].attrs?.[imageClass][1].concat(' not-zoom')
      }

      let appendRaw = ''
      if (match.groups?.text)
        appendRaw = `\n<figcaption>${md.renderInline(match.groups.text.substring(5))}</figcaption>`

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
      return `<figure ${match.groups?.class || ''} alt="${alt}">
        ${rawCode}${appendRaw}
      </figure>`
    }
    return imageRender(...args)
  }
}

export default ImagePlugin
