import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer'
import container from 'markdown-it-container'

export const containerPlugin = (md: MarkdownIt) => {
  md.use(...createMdContainer('tip', 'TIP', md))
    .use(...createMdContainer('info', 'INFO', md))
    .use(...createMdContainer('warning', 'WARNING', md))
    .use(...createMdContainer('danger', 'DANGER', md))
    .use(...createMdContainer('details', 'Details', md))
    .use(...createComptContainer(
      'code-group',
      () => '<CodeGroup>\n',
      () => '</CodeGroup>\n'),
    )
    .use(...createComptContainer(
      'code-group-item',
      (info: string) => `<CodeGroupItem title="${info}">\n`,
      () => '</CodeGroupItem>\n'),
    )
    .use(...createComptContainer(
      'ul',
      () => '<StepFlow type="ul">\n',
      () => '</StepFlow>\n'),
    )
    .use(...createComptContainer(
      'ol',
      () => '<StepFlow type="ol">\n',
      () => '</StepFlow>\n'),
    )
    .use(...createComptContainer(
      'li',
      (info: string) => `<StepFlowItem title="${md.renderInline(info)}">\n`,
      () => '</StepFlowItem>\n'),
    )
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]
type RenderPlaceFunction = (info: string) => string

function createComptContainer(
  name: string,
  before: RenderPlaceFunction,
  after: RenderPlaceFunction,
): ContainerArgs {
  return [
    container,
    name,
    {
      render(tokens, idx) {
        const infoStack: string[] = []
        const token = tokens[idx]
        if (token.nesting === 1) {
          const info = token.info.trim().slice(name.length).trim()
          infoStack.push(info)
          return before(info)
        }
        else {
          const info = infoStack.pop() || ''
          return after(info)
        }
      },
    },
  ]
}

function createMdContainer(
  name: string,
  defaultTitle: string,
  md: MarkdownIt,
): ContainerArgs {
  return [
    container,
    name,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(name.length).trim()
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle)
          if (name === 'details')
            return `<details class="${name} custom-block"><summary>${title}</summary>\n`

          return `<div class="${name} custom-block"><p class="custom-block-title">${title}</p>\n`
        }
        else {
          return name === 'details' ? '</details>\n' : '</div>\n'
        }
      },
    },
  ]
}

export default containerPlugin
