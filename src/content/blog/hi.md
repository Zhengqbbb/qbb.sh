---
title: Hello World
desc: Hi there! Welcome to my blog
---

![Image Example](/image/astro.webp)
:f[Picture from [Astro Together 2024](https://astro.build/blog/astro-together-montreal/) • June 2024]{size=400 fclass=m-auto}

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading

## Paragraphs

Most people would find the picture of our universe as an infinite tower of tortoises rather ridiculous, but why do we think we know better? What do we know about the universe, and how do we know it? Where did the universe come from, and where is it going? Did the universe have a beginning, and if so, what happened before then? What is the nature of time? Will it ever come to an end? Can we go back in time?

Recent breakthroughs in physics, made possible in part by fantastic new technologies, suggest answers to some of these longstanding questions. Someday these answers may seem as obvious to us as the earth orbiting the sun – or perhaps as ridiculous as a tower of tortoises. Only time (whatever that may be) will tell.

_Italic text_. **Bold text**. **_Bold and nested italic text_**. ~~Strike through text~~. :m[highlight text].

## Link

[Post List](/posts)

:i{carbon:logo-github} Github: https://github.com/Zhengqbbb

## List

### Tips for Embracing Minimalist Coding

- **Refactor Relentlessly**: Always be on the lookout for ways to streamline and optimize your code.
- **Embrace White Space**: Just as in design, white space in code can improve readability and comprehension.
- **Prioritize Functionality**: Before adding a new feature, ask yourself if it truly adds value or just complicates things.
- **Stay Updated**: Newer coding practices and languages often offer more concise ways to achieve the same results.


---

### 🌱 Growth Beyond Blogging

1. **Monetize with Ads**: Once you have a steady stream of visitors, consider integrating ads. Platforms like Google AdSense can be a good starting point.
2. **Affiliate Marketing**: Recommend products or services and earn a commission for every sale made through your referral.
3. **Sell Digital Products**: Leverage your expertise to create and sell e-books, courses, or software tools.
4. **Offer Consultation Services**: As an expert in your field, you can offer consultation services to businesses or individuals.

## Blockquote

> **What is SSG**: static site generation. Static-generated websites are nothing new for developers. We have been building them since the beginning of the web.

## GitHub-style alerts

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

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

## Containers

:::info
This is an info message.
:::

:::tip
This is a tip message.
:::

:::warning
This is a warning message.
:::

:::danger
This is a dangerous `warning` message.
:::

:::details
This is a details block.
:::

### Custom Container Title

:::tip[<i class="i-uil:lightbulb-alt"></i> - Custom Title]
This is an info message.
:::

## Images

![Image Example](/image/astro.webp)
:f{.no-zoom.m-auto fclass=m-auto size=200}

![Image Example](/image/astro.webp)
:f[Picture from [Astro Together 2024](https://astro.build/blog/astro-together-montreal/) • June 2024]{size=300 .m-auto fclass=m-auto}

![Image Example](/image/astro.webp)
:f[Picture from [Astro Together 2024](https://astro.build/blog/astro-together-montreal/) • June 2024]

![Image Example](/image/astro.webp)
:f

## CheckBox
remarkImage
- [x] Done - 1
- [x] Done - 2
- [ ] TODO - 3
- [ ] TODO - 4
