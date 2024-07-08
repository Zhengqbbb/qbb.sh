---
title: 回顾我这十七个月
desc: 一晃一年过半载，给这十七个月留下点痕迹
---

![2024-newyear-image](/image/2024-newyear.webp)
:f[📷 2024.02.11 汕头春节烟花]{size=400x495 figClass=m-auto}

距离上次写博客已经过去一年半了，我也没想过时间能过这么快，拖着拖着就到年中了，所以在这个深夜抓紧时间回顾<sup>补交</sup>我这十七个月。

## 在 Twitter 上进行分享

今年我大部分有关技术的分享，都放在了 :i{carbon:logo-x}[我的推特](https://x.com/zhengqbbb) 上进行。

- 推特上发线程类文章，可以做到很好分段说明
- 毕竟我崇拜的开发者关注了我，有粉丝就有动力了
- 花了大价钱买的 [Screen Studio](https://www.screen.studio/), [Canva](https://canva.com/), [CleanShot](https://cleanshot.com/) 视频编辑工具，就趁分享的时候还可以顺带练练手

👆 绝对不是想不起 GitHub 博客仓库的密码 😁

:::info[整理一下这段时间我在 Twitter 上分享的内容:]
- 2023.02.18 - [cz-git 接入 openai 生成 commit message](https://x.com/zhengqbbb/status/1626934799859580929)
- 2023.03.12 - [cz-git 提供 turbo 3.5 模型选项, 提供生成编辑](https://x.com/zhengqbbb/status/1634662649026969601)
- 2023.03.21 - [x-satori 项目开源 - 使用 Vue 文件利用 satori 生成 SVG 图像](https://x.com/zhengqbbb/status/1637849646075908096)
- 2023.06.17 - [npx 与 bunx 在 JSON schema 校验大量 JSON 数据集时的对比](https://x.com/zhengqbbb/status/1669982917018423296)
- 2023.09.27 - [分享 Nuxt3 + 无样式组件的网站开发体验](https://x.com/zhengqbbb/status/1706949854315106513)
- 2023.11.25 - [利用 X-CMD 的 advise 模块，提供了 czg 命令原生补全](https://x.com/zhengqbbb/status/1728393080179712045)
- 2024.02.03 - [借助 Google index API，使用 X-CMD 脚本一次批量删除失效页面](https://x.com/zhengqbbb/status/1753726896670396634)
- 2024.03.14 - [利用 Shiki 的 ANSI 渲染，分享了 X-CMD Terminal Theme 页面](https://x.com/zhengqbbb/status/1767944194621128931)
:::

## X-CMD

![x-cmd](/image/x-cmd-header.webp)
:f[https://x-cmd.com]{size=664x347 capClass=text-center}

算上来全职加入 X-CMD 团队已经快 3 年了，但去年的年中到现在，我的主要工作从开发 CLI 开发转为了网站的开发，其中就包括了 X-CMD 的官网，一个集命令行教程，工具基本信息，版本信息，快速命令演示于一体的教学网站。

网站的设计从颜色搭配，布局交互，到内容数据定义，再到插图绘制，除了内容之外，都是我一手日日夜夜梭出来的。目前 X-CMD 已经要到公测阶段面众，也预示着要进入最难的宣传阶段。

在两年前我完成 [cz-git, czg](https://cz-git.qbb.sh) 后，我就已经体会过 CLI 工具的推广要比其他应用难的多。

所以接下来的日子我可能要进入一段运营时期，试试看能不能自己推广他的组合命令后的强大玩法给更多人知道。

## 个人主页迁移 [Astro](https://astro.build/)

![astro-page](/image/astro-page.webp)
:f[[https://qbb.sh/hi](/posts/hi)]{size=664x475 capClass=text-center}

### Timeline

1. 迁移 Astro 的想法最早是在去年看见 [AstroPaper](https://astro-paper.pages.dev/) 这个项目后，被秒开的速度和 5KB 加载体积吓到了。随后就发现 [Xiaohan](https://zxh.me/) 也完成了迁移，随后就问了她开发体验和使用变化，详情可以看这个 :i{carbon:logo-github} [Giscus](https://github.com/This-is-an-Apple/giscus-zxh.io/discussions/23)
2. 平时用 Vue React 比较多，想知道一个针对为站点内容为中心的 Astro 框架实际开发体验
3. 其次是平时接触的站点用 SSG 比较多，类似一个 personal profile 的站点，如果不需要过多处理元素和数据交互，hydration 也可以不要直接做到最小开销，毕竟之前只用到了顶部栏的显隐和滚动监听，所以我就想知道用 Astro 到底能做多小，以及控制页面交互流程是什么感觉
4. 在年底的时候，我是想开始写年度总结的了，但是这一年我的编码习惯，对于 UnoCSS 的使用，以及颜色搭配上都不一样了，最可怕的是升级依赖，包括 Vite，PNPM 等依赖都需要大版本升级，想想干脆迁移到 Astro 看看什么效果，结果刚立项还是被 Eslint 劝退了，Astro 的 Eslint 是社区维护的，年初的时候还没跟上 flat config 的版本，越想越不对劲就关停到现在了 🐦
5. 直到最近看见了 :i{carbon:logo-x} [面条发的模版](https://x.com/ccbikai/status/1789994147237036482)，感觉真不戳，让我这个懒人彻底心动了，而且 Antfu 的 :i{carbon:logo-github} [Eslint](https://github.com/antfu/eslint-config) 也支持了 Astro，立马就着手动工

> 下次有这个想法就该直接关掉博客和域名迁移到 GitHub ISSUE 写博客 😤

---

### 开发体验喜忧参半

- **喜是**：写布局，用数据，嵌模版基本都是拳拳到肉，很容易就能 Get 到能怎么用，顺带还折腾了一下 [rehype](https://github.com/rehypejs/rehype) 和 [remark](https://github.com/remarkjs/remark) 的插件，一套页面撸下来体验嘎嘎爽 🤗
- **忧是**：后续要增强站点的时候，还是卡了一段时间
    - 对于 script 的 bundle 行为很奇怪，明明代码只有一句 console.log 都 bundle 分了一个文件，但是如果想要 script inline 的话，则需要自行处理，缺少了一个既要又要的方式
    - 还有就是能很明显感觉到 Astro 偏向 SSR，例如禁用 `transformIndexHtml` 导致在构建时你想给页面统一注入有点麻烦等...
    - 其次就是 `__dirname` 开发和构建时不一致 😶‍🌫️，对于一个脚本开发者来说，这点很敏感，我不能保证这 script 绝对能获取到数据，以及后续 Astro 升级会不会做出更改等，导致后面我连 file endpoints，hook 都不敢过多尝试

:m[但总的来说，Astro 体验还是很好的，目前的 profile 也做到了想要的体积和交互体验 😇]


## 生活

![2024-new-house](/image/2024-new-home.webp)
:f[🏠 小宿舍 • 2024.06.23]{size=664x498 data-zoom-src="/image/2024-new-home.jpg" capClass=text-center}

这一年熬夜还是很严重，已经记不清上一次 2 点前睡觉是什么时候了，但这一年开始注重调节生活和工作了，放假如果非必要休想我看一眼代码 😤。

最近还搬到了一个新的小两层房子，开启快乐的独居生活，步行到公司 4分钟，是的，完成了小时候的梦想:m[公司就在家门口] 🙄。优点是楼下就是湿地公园，安静又舒服，希望未来的日子里可以多一点享受生活。

就这样，我们下次见 🌛
