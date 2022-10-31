# Paragraphs

# H1 Heading

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading

## English

Most people would find the picture of our universe as an infinite tower of tortoises rather ridiculous, but why do we think we know better? What do we know about the universe, and how do we know it? Where did the universe come from, and where is it going? Did the universe have a beginning, and if so, what happened before then? What is the nature of time? Will it ever come to an end? Can we go back in time?

Recent breakthroughs in physics, made possible in part by fantastic new technologies, suggest answers to some of these longstanding questions. Someday these answers may seem as obvious to us as the earth orbiting the sun – or perhaps as ridiculous as a tower of tortoises. Only time (whatever that may be) will tell.

*Italic text*。**Bold text**。***Bold and nested italic text***。~~Strikethrough text~~。==highlight text==。

## 中文

大部分人会觉得，把我们的宇宙喻为一个无限的乌龟塔相当荒谬，可是为什么我们自以为知道得更多一些呢？我们对宇宙了解了多少？而我们又是怎样才知道的呢？宇宙从何而来又将向何处去？宇宙有开端吗？如果有的话，在这开端之前发生了什么？时间的本质是什么？它会有一个终结吗？

在物理学上的一些最新突破，使一部分奇妙的新技术得以实现，从而对于回答这些长期以来悬而未决的某些问题有所启发。也许有一天这些答案会像我们认为地球绕着太阳运动那样显而易见——当然也可能像乌龟塔那般荒唐可笑。不管怎样，惟有让时间来判断了。

*斜体文本*。**加粗文本**。***加粗斜体文本***。~~删除文本~~。==高亮文本==。

## Link

Github: https://github.com/Zhengqbbb

Project: [cz-git](https://cz-git.qbb.sh)


## List

- cz-git
- czg
- cz-git-extension<sup>(Todo)</sup>

---

1. cz-git
2. czg
3. cz-git-extension<sup>(Todo)</sup>

## Blockquote

> Only time (whatever that may be) will tell.

## Code


### Inline Code

`npx czg emoji`

You can use default alias `npx czg :fd` in any project

### Code Block

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

```json
{
  "scripts": {

  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

### Code Group

:::: code-group
::: code-group-item NPM

```sh
npm install -D cz-git
```

:::
::: code-group-item YARN

```sh
yarn add -D cz-git
```

:::
::: code-group-item PNPM

```sh
pnpm install -D cz-git
```

:::
::::

## Table

| Name | Description |
|------|------|
| [cz-git](https://cz-git.qbb.sh/) | 🔩 A more engineered, lightweight, customizable, standard output format **Commitizen Adapter** |
| [czg](https://cz-git.qbb.sh/cli/) | 📤 Interactive **CLI** that generate standardized commit messages. **Commitizen CLI alternative** |

## Images

![Image Example](/pwa-512x512.png)

## Containers

<!-- ::: link {fa-github-alt} [vuepress-theme-gungnir](https://github.com/Renovamen/vuepress-theme-gungnir)
A blog theme for VuePress 2.
:::

::: link {/img/links/me.png} [My Blog](https://blog.zxh.io)
My blog 🧐, powered by VuePress 2, themed by Gungnir.
::: -->

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
```cpp
cout << "Hello World!" << "\n";
```
:::
