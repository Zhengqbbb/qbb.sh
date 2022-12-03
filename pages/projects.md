---
title: Project - Q.Ben Zheng
desc: Q.Ben's Project List | Zhengqbbb
projects:
  Upcoming:
    - name: 'X-CMD'
      desc: 'Collection of CLI'
      icon: 'x-cmd'
      link: 'https://github.com/x-cmd'
  CLI:
    - name: 'cz-git'
      desc: 'Commitizen CLI adapter'
      icon: 'i-carbon-plug'
      link: 'https://cz-git.qbb.sh/guide/introduction'
    - name: 'czg'
      desc: 'Commitizen CLI alternative'
      icon: 'i-carbon:terminal'
      link: 'https://cz-git.qbb.sh/cli/'
  VS Code Extensions:
    - name: 'vitesse-qb'
      desc: 'VS Code theme fork by Vitesse Theme'
      icon: 'i-carbon-campsite'
      link: 'https://github.com/Zhengqbbb/vitesse-qb-vscode-theme'
  Vuepress Plugins:
    - name: 'clipboard'
      desc: |
        Generate code copy button
        (Vuepress V2 plugin)
      icon: 'i-carbon:copy'
      link: 'https://github.com/Zhengqbbb/vuepress-plugin/tree/main/packages/plugin-clipboard'
    - name: 'china-search-console'
      desc: |
        Enhance China search console
        (Vuepress V2 plugin)
      icon: 'i-carbon:earth-southeast-asia'
      link: 'https://github.com/Zhengqbbb/vuepress-plugin/tree/main/packages/plugin-china-search-console'
  Toys:
    - name: 'qb-coin'
      desc: 'Manage and view BSC coins in terminal'
      icon: 'i-carbon:condition-wait-point'
      link: 'https://github.com/Zhengqbbb/qb-coin'
---

<script setup>
import { useHeadByFrontmatter } from '~/composables/frontmatter.ts'
useHeadByFrontmatter()
</script>

# Projects

<ListProjects :projects="frontmatter.projects" />
