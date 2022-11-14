# H1 Heading

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading

## Paragraphs

### English

Most people would find the picture of our universe as an infinite tower of tortoises rather ridiculous, but why do we think we know better? What do we know about the universe, and how do we know it? Where did the universe come from, and where is it going? Did the universe have a beginning, and if so, what happened before then? What is the nature of time? Will it ever come to an end? Can we go back in time?

Recent breakthroughs in physics, made possible in part by fantastic new technologies, suggest answers to some of these longstanding questions. Someday these answers may seem as obvious to us as the earth orbiting the sun – or perhaps as ridiculous as a tower of tortoises. Only time (whatever that may be) will tell.

*Italic text*。**Bold text**。***Bold and nested italic text***。~~Strike through text~~。==highlight text==。

### 中文

大部分人会觉得，把我们的宇宙喻为一个无限的乌龟塔相当荒谬，可是为什么我们自以为知道得更多一些呢？我们对宇宙了解了多少？而我们又是怎样才知道的呢？宇宙从何而来又将向何处去？宇宙有开端吗？如果有的话，在这开端之前发生了什么？时间的本质是什么？它会有一个终结吗？

在物理学上的一些最新突破，使一部分奇妙的新技术得以实现，从而对于回答这些长期以来悬而未决的某些问题有所启发。也许有一天这些答案会像我们认为地球绕着太阳运动那样显而易见——当然也可能像乌龟塔那般荒唐可笑。不管怎样，惟有让时间来判断了。

*斜体文本*。**加粗文本**。***加粗斜体文本***。~~删除文本~~。==高亮文本==。

## Link

<i class="i-carbon:logo-github"/> Github: https://github.com/Zhengqbbb/qbb.sh

<i class="i-bxs:terminal"/> Project: [cz-git](https://cz-git.qbb.sh)


## List

- cz-git
- czg
- cz-git-extension<sup>(Todo)</sup>

---

1. cz-git
2. czg
3. cz-git-extension<sup>(Todo)</sup>

## Blockquote

> **What is commitizen**: A Node.js-based `git commit` command-line tool that assists in generating standardized commit messages.
>
> **What is an adapter**: Replace the interactive plugin for the commitizen command line tool.

## Table

| Name | Description |
|------|------|
| [cz-git](https://cz-git.qbb.sh/) | 🔩 A more engineered, lightweight, customizable, standard output format **Commitizen Adapter** |
| [czg](https://cz-git.qbb.sh/cli/) | 📤 Interactive **CLI** that generate standardized commit messages. **Commitizen CLI alternative** |

## Code

### Inline Code

`npx czg emoji`

You can use default alias `npx czg :fd` in any project

### Code Block

```sh
x theme use vitesse
```

```json
{
  "scripts": {
    // ...
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

```js
// .commitlintrc.js
const fs = require('fs')
const path = require('path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))

module.exports = {
  rules: {
    'scope-enum': [2, 'always', [...packages]]
  }
}
```

### Code Group

:::: code-group
::: code-group-item npm

```sh
npm install -D cz-git
```

:::
::: code-group-item yarn

```sh
yarn add -D cz-git
```

:::
::: code-group-item pnpm

```sh
pnpm install -D cz-git
```

:::
::::


## Images

![Image Example](/img/vitesse.webp) <!-- size=120x120 -->
![Image Example](/img/vitesse.webp) <!-- size=240 -->
![Image Example](/img/vitesse.webp) <!-- -->

## Containers

::: info
This is an info message.
:::

::: tip
This is a tip message.
:::

::: warning
This is a warning message.
:::

::: danger
This is a dangerous warning message.
:::

::: details Show me the code.
```sh
printf "%s\n" "Hello world"
```
:::

## CheckBox

- [x] HomePage
- [x] image medium-zoom
- [ ] refactor navbar
- [ ] markdown-container style
- [ ] TOC sidebar
- [ ] `header-anchor` auto jump after enter by link
- [ ] ==Post page== `date parse` and `read time parse`
- [ ] ==Post List page==
- [ ] ==Project List page==
- [ ] HTML OG image, title, description auto gen
- [ ] RSS | feed
- [ ] Image figure markdown plugin
- [ ] Step flow markdown plugin
- [ ] markdown-container-link-card plugin

> WIP road map <br>
> https://github.com/Zhengqbbb/qbb.sh
