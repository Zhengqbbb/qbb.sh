---
title: cz-git and czg development journey
desc: Why developed cz-git and czg. My development journey
---

> [中文 Chinese Version](/posts/2022-12-26-cz-git-czg-journey-zh)

![cz-git-logo](/image/cz-git.webp) <!-- <size="500"> <class="m-auto"> <!> <desc="cz-git: https://cz-git.qbb.sh/<br>czg : https://cz-git.qbb.sh/cli/"> -->

> What is [Commitizen CLI](https://github.com/commitizen/cz-cli) : Based on Node.js command line tool，Interactively generate standard formatted `git commit message` <br>
> What is [Commitizen Adapter](https://github.com/commitizen/cz-cli#adapters) : Plugin that replaces Commitizen CLI interaction behavior <br> > <br> > [cz-git](https://cz-git.qbb.sh/zh/guide/introduction) : Lightweight, interactive friendly, highly customizable, standard Angular commit formatted _Commitizen Adapter_<br> > [czg](https://cz-git.qbb.sh/zh/cli/) : Understand it as built-in `cz-git` adapter `Commitizen CLI` _alternative_

**In this article, I will introduce why `cz-git` and `czg` were developed. My development journey 🤗**

## Story Beginning

It have to start from submitting contributions to [Vuepress-Theme-Gungnir](https://github.com/Renovamen/vuepress-theme-gungnir) at the beginning of this year.
In fact, I have been using `Commitizen CLI` since my internship. A simple combination of `Commitizen CLI` + `cz-conventional-changelog`, and I generally skipped input scope. <br>And `Vuepress-Theme-Gungnir` is a monorepo that integrates blog themes, blog plugins, demos and documentation. So for the commit message, you need to add the scope <sup>usually the plugin name or theme</sup>. e.g: `fix(plugin-rss): do something with plugin...`

But for a lazy person like me who also is full-time development of CLI.<br>**I will never do stupid things like repetitive input.**

So I submitted [PR using `cz-customizable`](https://github.com/Renovamen/vuepress-theme-gungnir/pull/34), trying to resolve the problem of repetitive input commit through declarative configuration scopes. But I known soon that `cz-customizable` didn't really resolve the need after using.

1. If you add the configuration of [commitlint](https://commitlint.js.org/), you need to configure two places, and their configurations can use the same one to affect each other

2. **Only the interactive mode of up and down selection is too slow to use**, if the declared scopes more than 20, then every time you commit, you need to find scope by typing <kbd>↑</kbd> and <kbd>↓</kbd><br>But in fact, when you commit You already have the answer in your mind, so the interactive way must have a **fuzzy search** feature<br>For example, adding a test to the table component is the greatest interactive way<kbd>te</kbd> <kbd>Enter</kbd> Output `test`. <kbd>ta</kbd> <kbd>Enter</kbd> output `table`

At that time, I decided to develop `cz-git` that can become the most friendly interactive and the greatest adapter. LOL

---

## Exploring Node.js CLI Can Do What

Actually another very important reason is to explore Node.js can do what great effect.<br>BTW I am painful to develop CLI with SHELL and AWK in daily work, And the development of `cz-git` can transferred my attention <sup>😈😈 Playing Node</sup>

### Dynamic Configuration And Interaction

The advantage of using `Node.js` to do CLI is that **you can write JavaScript configuration as a dynamic configuration to drive terminal UI behavior**. Giving it intelligence and making it more suitable for your usage habits<br>

For example: when writing monorepo configuration, you can use `path` and `fs` modules to dynamically define the scopes. And you can use the git command to determine the position of the selection item

:::details View `.commitlintrc.cjs` configure code

```js
// .commitlintrc.cjs
const fs = require('node:fs')
const path = require('node:path')

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

![cz-git-demo](/image/cz-demo-1.gif) <!-- <size="700x268"> -->

### Command-line completion

**Completion is great in command line interaction**. Common operating way is using <kbd>Tab</kbd> or <kbd>→</kbd> to complete the information.<br>
Based on dynamic configuration way. We can have many feature, such as completing the pre-message template or completing the number of the ISSUE

The most classic example in [Element-Plus](https://github.com/element-plus/element-plus) component library, which has very strict requirements for component commit, except for the need to type `components` as the scope, it is also need to add the component name on prefix subject <br> e.g:

```
feat(components): [button] I did something with button
```

The processing methods are similar, and there are detailed records on [website recipes](https://cz-git.qbb.sh/recipes/default-subject)<br>
The final effect and interactive experience are comfortable and nice 🤗

![cz-git-demo](/image/cz-demo-2.gif) <!-- <size="700x268"> -->

---

## The Development Journey of czg

In an accidental docker environment test, The idea of `Commitizen CLI` alternatives development was born.

### Too Many Dependency

If you add `commitizen` as a dependency in your project, you will find that downloading dependencies takes a long time

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

You will find that `commitizen` dependencies are complicated.<br> The total dependencies ==147==, the total size ==102 MB==, **I can't accept it**!<br>
So I don't recommend using `commitizen` as a project dependency.

And actually `czg` can be made smaller, but in order to take as an adapter, I need to use [`inquirer`](https://github.com/SBoudrias/Inquirer.js) TUI library, otherwise use other TUI libraries or develop by myself It can around 300-500KB 🧐

### Startup Speed

`Commitizen CLI` needs to be matched with an adapter. You can understand that choose your favorite UI plugin, and it is only used as a launcher. <br>However, for command that are frequently used like `commit`, every time Node is started. It need to search for the adapter in `node_modules` layer by layer, This involves the loss caused by frequent traversal of the file system, so you will find that the startup speed sometime fast or sometime slow.

### Usage

1. Reduce redundant concepts, simpler. Using `Commitizen CLI` has an additional concept of _adapter_, **cannot be used out of the box**, basically you need to know _adapter_ after installation and then configure the _adapter_.<br> More configuration steps and redundant concepts, it make usage becomes complex.

2. `npx` usage. It is better to support `npx czg` directly usage as a Node CLI. Although `npx` is slowly startup speed in terminal using, it is still useful if you have good dependencies number and size control.

3. More command line usage. `Commitizen CLI` does NOT provide the adapter can have command line usage. like `SubCommand` and `Option` feature can affect the interaction or result. The adapter just only using environment variables. A few examples:
    - If you want to use multi select mode, Just typing `git czg checkbox`
    - When you want to commit message with Emoji. Just also typing `git czg emoji`
    - Or using the defined and frequently used message alias<br> such as modifying the configuration, fix typos in the document<br> At this time, you can directly use `git czg :fd` <sup>git czg :\<alias\></sup>, **without enabling interactive mode**

Based on the above points, I finished `czg`, and now `git czg` is finally comfortable to usage 🤗

---

## Wrapping Up

It is my journey of developing `cz-git` and `czg`, a process of constantly exploring the friendly interaction of Node.js CLI, and making the tools better. Welcome give a [star ⭐](https://github.com/Zhengqbbb/cz-git)

Finally, thanks guys who supported and provided suggestion and help all the time ! Thx 😊
