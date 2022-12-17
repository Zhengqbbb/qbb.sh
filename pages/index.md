# Vitesse ✘ QB 模版

[Vite-SSG](https://github.com/antfu/vite-ssg) 搭建静态个人网站模板

[预览页面](/posts/2022-12-16-preview) | [教程介绍](/posts/2022-12-15-guide)

## 快速开始

::::::ol
:::::li 基于本站点, 获得干净模版

:::: code-group
::: code-group-item degit

```sh
# (开终端代理)
npx degit Zhengqbbb/qbb.sh#cn-latest my-site
```

:::
::: code-group-item git clone

```sh
git clone --depth 1 --branch cn-latest git@github.com:Zhengqbbb/qbb.sh.git my-site
```

:::
::::

:::::
:::::li 下载依赖，启动项目

```sh
cd my-site
# 没有 pnpm 命令，运行 `npm install -g pnpm`
pnpm i
pnpm dev
```

:::::
:::::li 尝试更新你个人的信息

- [ ] 修改作者名 `LICENSE`
- [ ] 修改站点信息 `src/meta.ts`
- [ ] 更换你的图标 `public/`

:::::
::::::

跟随教程. 并开始创作吧 :)
