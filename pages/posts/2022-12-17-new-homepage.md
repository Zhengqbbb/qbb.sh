---
title: New homepage
description: Building a static personal website by Vite-SSG
---

[[toc]]

![vitesse-qb](/image/vitesse-qb.svg) <!-- <size="180"> <class="m-auto"> <!> -->

Static site generation(SSG). Seems to have been around since I started programming.

At the end of 2021, I was ready to build official website of X-CMD. I came into contact with [Vuepress-next](https://github.com/vuepress/vuepress-next), at that time I notice [vuepress-theme-gungnir](https://github.com/Renovamen/vuepress-theme-gungnir)
and finished my first personal website, but I didn't seem to be satisfied.

Then I submitted my first PR and started contributing to open source: adding features, maintaining the theme, changing styles, fixing bug, finding fancy pictures...

Yeah, it took me so much time to develop "theme" that I almost forgot about writing article lol.

## What I really would like

In fact, everyone needs for personal sites are different. Some people like out of the box declarative configuration to build pages, some like visual custom build pages, and some like pages full of professional design elements... So choose what you like.

I thought about what website would like be:
- Focus articles content. **simple** page design
- All the data and the build process is mastered by myself
- **Self realized**. No depend on any theme. No need to maintain themes
- Write more scripts, I like coding scripts(shell awk ts), so my personal site will be full of various experimental scripts and some great point feature implementation.

## Tech stack

:::info What Is Diff
- `**** generator`:
  - what data is provided <i class="text-c-fgDeeper i-material-symbols:keyboard-double-arrow-right" /> how get page and parse data <i class="text-c-fgDeeper i-material-symbols:keyboard-double-arrow-right" /> realize the feature
- `vite-ssg` + `vite-plugin-pages` +`vite-plugin-vue-layouts` + `vite-plugin-md`:
  - define page data <i class="text-c-fgDeeper i-material-symbols:keyboard-double-arrow-right" />parse page data <i class="text-c-fgDeeper i-material-symbols:keyboard-double-arrow-right" /> realize the feature
:::

Everything is created and maintained by myself, I can remember and parse whatever my create data. Enjoy lightweight, fast and free.<br>
Don’t need to rely on any upstream depend, or cater to others people usage.<br>
==Just do it==

## Thanks and inspired by

> I prepared a clean personal website template if you like my website style
>
> Preview | Guide: [https://vitesse-qb.netlify.app/](https://vitesse-qb.netlify.app/) <br>
> Chinese Version. 中文版本: [https://vitesse-qb-cn.netlify.app/](https://vitesse-qb-cn.netlify.app/)


- Anthony Fu : https://antfu.me/
- Shu Ding: https://shud.in/
- Xiaohan Zou: https://zxh.io/
- Vitepress: https://vitepress.vuejs.org/


Hope everyone can have a satisfied personal website. And now I will start to creative journey 🤗 ~
