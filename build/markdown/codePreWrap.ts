import type MarkdownIt from 'markdown-it'

/** Powered by: vitepress */
export const codePreWrapperPlugin = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const lang = tokens[idx].info.trim().replace(/-vue$/, '')
    const rawCode = fence(...args)
    return `<div class="language-${lang}">
    <button title="Copy Code" class="copy"></button>
    <span class="lang">${lang === 'vue-html' ? 'template' : lang}</span>
    ${rawCode}
    </div>`
  }
}

export default codePreWrapperPlugin
