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
 * `![Image Example](/image/a.gif) <!-- size=900x220 desc=hello world. by[@hello](http:...) -->`.
 *  use lazy attrs. width 900. height 220. figcaption<image description>: hello world.<a href="http:...">@hello</a>
 * @author Zhengqbbb <https://github.com/Zhengqbbb>
 */
export const ImagePlugin = (md: MarkdownIt) => {
  const imageRE = /^<!-- (?<link>\<link="\[.*\)"\>)? ?(?<size>\<size="(\d+)(x\d+)?"\>)? ?(?<class>\<class="[A-Za-z0-9-#$: ]+"\>)? ?(?<notZoom>\<!\>)? ?(?<desc>\<desc=".*"\>)? ?-->/i
  const sizeRE = /size="(?<width>\d+)(?<height>x\d+)?"/i
  const linkRE = /link="\[(?<title>.*)\]\((?<link>.*)\)"/i

  const imageRender = md.renderer.rules.image!

  md.renderer.rules.image = (...args) => {
    const [tokens, idx] = args
    const match = tokens[idx + 2] ? tokens[idx + 2].content.match(imageRE) : null
    if (match) {
      let resultPre = ''
      let resultEnd = ''
      let appendRaw = ''
      let className = ''
      if (match.groups?.link) {
        const linkMatch = match.groups.link.match(linkRE)
        resultPre += `<a target="_blank" href="${linkMatch?.groups!.link}">`
        resultEnd += '</a>'
        appendRaw += `\n<figcaption class="title">${md.renderInline(linkMatch!.groups!.title)}</figcaption>`
        className += 'link '
        match.groups.notZoom = 'true'
      }

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

      if (match.groups?.class) {
        className += match.groups
          .class
          .substring(1)
          .substring(0, match.groups?.class.length - 2) || ''
      }

      if (match.groups?.notZoom) {
        const imageClass = tokens[idx].attrs?.findIndex(i => i?.[0] === 'class')
        imageClass === undefined || imageClass === -1
          ? tokens[idx].attrs?.push(['class', 'not-zoom'])
          : tokens[idx].attrs?.[imageClass][1].concat(' not-zoom')
      }

      if (match.groups?.desc) {
        const desc = match.groups.desc
          .substring(7, match.groups.desc.length - 2)
        appendRaw += `\n<figcaption>${md.renderInline(desc)}</figcaption>`
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

      return `<figure ${className} alt="${alt}">${resultPre}
        ${rawCode}${appendRaw}
        ${resultEnd}</figure>`
    }
    return imageRender(...args)
  }
}

export default ImagePlugin
