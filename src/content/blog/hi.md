---
title: Hello World
desc: Hi there! Welcome to my blog
---

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading

## Paragraphs

Most people would find the picture of our universe as an infinite tower of tortoises rather ridiculous, but why do we think we know better? What do we know about the universe, and how do we know it? Where did the universe come from, and where is it going? Did the universe have a beginning, and if so, what happened before then? What is the nature of time? Will it ever come to an end? Can we go back in time?

Recent breakthroughs in physics, made possible in part by fantastic new technologies, suggest answers to some of these longstanding questions. Someday these answers may seem as obvious to us as the earth orbiting the sun – or perhaps as ridiculous as a tower of tortoises. Only time (whatever that may be) will tell.

_Italic text_. **Bold text**. **_Bold and nested italic text_**. ~~Strike through text~~. ==highlight text==.

## Link

[Post List](/posts)

<i class="i-carbon:logo-github"></i> Github: https://github.com/qbbsh/vitesse-qb

## List

-   foo
-   bar
-   fruit
    -   apple
    -   banana

---

1. The first ...
2. The second ...
3. The third ...

---

::::ul
:::li 2022-02-15
Create repo
:::

:::li 2022-02-28
Released the first available version
:::
::::

---

::::ol
:::li Get a clean template base the current site

```sh
npx degit qbbsh/vitesse-qb my-site
```

:::
:::li Download dependent startup project

```sh
cd my-site
# pnpm command not found? try `npm install -g pnpm`
pnpm i
pnpm dev
```

:::
::::

## Blockquote

> **What is SSG**: static site generation. Static-generated websites are nothing new for developers. We have been building them since the beginning of the web. Using Vite-SSG ad Vue.js building rich website do so easily.

## Table

| SubCommand | Description                      |
| ---------- | -------------------------------- |
| `break`    | Appends a ! after the type/scope |
| `emoji`    | Output message with emoji mode   |
| `checkbox` | Turn on scope checkbox mode      |
| `gpg`      | Use GPG sign commit message      |

## Code

### Inline Code

Try to use `npx czg :<alias name>` alias in the project

### Code Block

```ts
import fs = require('fs')

class MyClass {
  public static myValue: string
  constructor(init: string) {
    this.myValue = init
  }
}
namespace MyModule {
  export interface MyInterface extends Other {
    myProperty: any
  }
}

declare const magicNumber: number
myArray.forEach(() => { }) // fat arrow syntax
```

```py
@requires_authorization(roles=["ADMIN"])
def somefunc(param1='', param2=0):
    r'''A docstring'''
    if param1 > param2: # interesting
        print 'Gre\'ater'
    return (param2 - param1 + 1 + 0b10l) or None

class SomeClass:
    pass

>>> message = '''interpreter
... prompt'''
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

::: details Details
This is a details block.
:::

## Images

![Image Example](/image/vitesse.webp) <!-- <size="400"> <class="m-auto"> <desc="Campground by [@Finca Los Vientos](https://reurl.cc/28aQr4) • Aug 2021"> -->

![Image Example](/image/vitesse.webp) <!-- <desc="Campground by [@Finca Los Vientos](https://reurl.cc/28aQr4) • Aug 2021"> -->

## CheckBox

-   [x] Done - 1
-   [x] Done - 2
-   [ ] TODO - 3
-   [ ] TODO - 4
