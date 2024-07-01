---
title: cz-git 和 czg 的开发之旅
desc: 为什么会开发 cz-git 和 czg，我的开发心路历程
---


![cz-git-logo](/image/cz-git.webp)
:f[cz-git: https://cz-git.qbb.sh/zh/<br>czg : https://cz-git.qbb.sh/zh/cli/]{size=500 fclass=m-auto .no-zoom}

> 什么是 [Commitizen CLI](https://github.com/commitizen/cz-cli) : 基于 Node.js 的命令行工具，交互式辅助生成规范格式的 `git commit message` <br>
> 什么是 [Commitizen Adapter](https://github.com/commitizen/cz-cli#adapters)<sup>「适配器」</sup> : 更换 Commitizen CLI 交互行为的插件 <br>
> <br>
> [cz-git](https://cz-git.qbb.sh/zh/guide/introduction) : 一款轻量级，交互友好，高度自定义，遵循标准 Angular commit 规范的 Commitizen Adapter<br>
> [czg](https://cz-git.qbb.sh/zh/cli/) : 可以理解为是一款内置了 `cz-git` 适配器的 `Commitizen CLI` 替代品

**本文我将介绍为什么会开发 `cz-git` 以及 `czg`。我的开发心路历程** 🤗

## 起源

那还得是从今年年初给 [Vuepress-Theme-Gungnir](https://github.com/Renovamen/vuepress-theme-gungnir) 提交贡献开始说起，其实从实习开始我就一直有使用 `Commitizen CLI` + `cz-conventional-changelog` 的简单组合，只不过一般不打 commit 的范围直接就跳过<br>而 `Vuepress-Theme-Gungnir` 是一个融合了 博客主题，博客插件，演示及文档的 monorepo <sup>单体仓库</sup>。所以对于 commit message 是需要加上范围的<sup>一般为插件名或主题</sup><br>例子: `fix(plugin-rss): do something with plugin...`

:m[但对于我这样的懒人，而且还是全职做 CLI 的人来说，是绝不会干重复性输入的傻事]

所以很快我就提交了 [PR 使用 `cz-customizable`](https://github.com/Renovamen/vuepress-theme-gungnir/pull/34)，想通过声明式配置来解决重复性输入 commit 的范围<sup>scope</sup>。但很快就发现，这并不能真正解决需求

1. 如果加上 [commitilint](https://commitlint.js.org/) 的配置，就需要配置两个地方，他们的配置是可以用同一份，互相影响
2. 其次是仅有上下选择的交互方式用起来太慢了，如果声明的范围达到20个，那么每次 commit，就需要上下寻找对应的范围，但其实你在 commit 的时候脑海里就已经有了答案，所以交互方式就势必要有搜索功能<br>举个例子，为 table 组件添加测试，最为理想的交互方式 <kbd>te</kbd> <kbd>Enter</kbd> 输出 `test`。<kbd>ta</kbd> <kbd>Enter</kbd> 输出 `table`

所以当时开发 `cz-git` 目标就是，做一款市面上交互最能打，最好用的适配器，嘿嘿

## 不断探索 Node.js CLI 的边界

其实还有一个很重要的开发原因就是想要探索 Node.js 做 CLI，究竟可以做到什么样的效果，因为日常被 SHELL 和 AWK 开发 CLI 折磨得很痛苦，所以开发 `cz-git` 转移一下注意力<sup>😈暴揍 Node</sup>

### 动态的配置与交互

使用 Node.js 做 CLI 最大的优势就是在于 **你可以编写 JavaScript 配置来玩动态配置驱动其 UI 与行为**，赋予 CLI 一定的智能化，让 CLI 更契合使用习惯

举个例子：在编写 monorepo 配置时可以利用 `path` 和 `fs` 模块动态定义 commit message 中的scopes<sup>范围</sup>显示，当然我们也可以利用 git 命令的结果来决定选择项的位置

:::details[查看 `.commitlintrc.cjs` 配置代码]
```js
// .commitlintrc.cjs
const path = require('node:path')
const fs = require('node:fs')

const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))

const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find(r => ~r.indexOf('M  packages'))
  ?.replace(/\//g, '%%')
  ?.match(/packages%%((\w|-)*)/)?.[1]

module.exports = {
  prompt: {
    scopes: [...packages],
    defaultScope: scopeComplete,
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
  }
}
```
:::

![cz-git-demo](/image/cz-demo-1.gif)
:f{size=664x257}


### 补全型交互

**在命令行中智能补全交互尤为关键**，操作手法一般是使用 <kbd>Tab</kbd> 或 <kbd>→</kbd> 补全信息<br>
基于上述动态配置处理手法，我们可以拥有玩法就很多了，补全前置消息模版亦或是补全 ISSUE 的编号都可以

最经典的例子，就是在 [Element-Plus](https://github.com/element-plus/element-plus) 组件库中的使用，其对于组件 commit 的要求很严格，除了需要输入 `components` 作为范围之外，还需要将组件名进行标识，方便后续统一处理生成 CHANGELOG<br> e.g:

```
feat(components): [button] I did something with button
```

处理的手法都大同小异，文档中都有详细的[记录](https://cz-git.qbb.sh/zh/recipes/default-subject)，这里就不再叙述了<br>
最终得到的效果和整体交互体验还是很舒服的 🤗

![cz-git-demo](/image/cz-demo-2.gif)
:f{size=664x257}

---

## czg 的开发历程

在一次偶然的 docker 环境测试中，渐渐拉开我对于 `Commitizen CLI` 替代品开发的序幕

### 依赖刺客

如果你在项目当中添加 `commitizen` 作为依赖项，你会发现下载依赖非常久

```ansi
[90m$[0m [32mnpm[0m install -D [36mcommitizen[0m
added [31m148[0m packages, and audited 149 packages in [31m2 m[0m
[90m$[0m [32mdu[0m -sh ./node_modules
[31m102M[0m ./node_modules

[90m$[0m [32mnpm[0m install -D [36mczg[0m
added [31m1[0m packages, and audited 2 packages in [31m408 ms[0m
[90m$[0m [32mdu[0m -sh ./node_modules
[31m1.3M[0m ./node_modules
```

细看后你会发现它的项目依赖非常复杂，共计依赖:m[147个]==，共计大小:m[102MB]，我无法接受！<br>
所以我非常不建议将 `commitizen` 作为项目依赖项

> 当然 `czg` 其实还可以做到更小，但是为了兼顾作为适配器需要使用 [`inquirer`](https://github.com/SBoudrias/Inquirer.js) TUI 库，不然使用其他 TUI 库或是原生写应该可以做到300-500KB左右 🧐

### 启动速度

`Commitizen CLI` 是需要搭配适配器使用，你可以理解为可以选择自己喜欢的 UI 插件，而他仅仅就作为一个命令的启动器<br>但是像 `commit`这种高频使用的 CLI，在每次启动的时候，Node 就比较拉胯，需要在 `node_modules` 当中一层层寻找你设置的适配器包，这涉及到频繁遍历文件系统所会带来损耗，所以你会发现启动速度是时快时慢


### 使用体验

1. 抛去多余的概念，更简单。使用 `Commitizen CLI` 由于多了一个适配器的概念，**做不了开箱即用**，基本上安装完都需要知道 *适配器* 然后配置一下使用的 *适配器*，多了配置步骤和多余的概念，就让人感觉给项目添加一个交互式的命令行工具很复杂

2. `npx` 使用。作为 Node 的 CLI 最好是能支持 `npx czg` 直接启动的方式，虽然 `npx` 在启动速度上也是比较拉胯，但如果你依赖和体积控制的比较好，日常突然想用的时候还是很好用的

3. 更多命令行的玩法支持。`Commitizen CLI`在设计上是没有考虑给适配器来做命令指令的玩法扩展，你可以理解为我们适配器想要做更多命令行的玩法功能，**就只能使用环境变量的玩法，做不了 `SubCommand` <sup>子命令</sup> 和 `Option`<sup>参数传递</sup> 等命令行常见功能使用方式**，举几个例子
    - 如果想要在本次 commit 使用多选范围模式，直接添加子命令即可 `git czg checkbox`
    - 想要在 commit message 中添加 Emoji，同理直接使用 `git czg emoji` 即可
    - 或是使用已定义的频繁使用 message alias，像修改配置，修改文档错别字等，这时候开启交互模式反而麻烦，就可以直接使用 `git czg :fd` <sup>git czg :\<alias\></sup>

基于以上几点，让我完成了 `czg`，而现在 `git czg` 敲起来也终于左右手得以连贯舒适了很多 🤗

## 结语

以上就是我开发 `cz-git` 和 `czg` 的心路历程，一个不断探索 Node.js CLI 友好交互的过程，顺便把工具做的更好，如果可以的话欢迎给一个 [star ⭐](https://github.com/Zhengqbbb/cz-git)

最后感谢这一年支持以及提供建议或是帮助的人! 😊
