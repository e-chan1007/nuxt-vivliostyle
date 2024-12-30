# `@e-chan1007/nuxt-vivliostyle`

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Install the dependency:

```bash
# npm
npm install @e-chan1007/nuxt-vivliostyle

# pnpm
pnpm install @e-chan1007/nuxt-vivliostyle

# yarn
yarn install @e-chan1007/nuxt-vivliostyle

# bun
bun install @e-chan1007/nuxt-vivliostyle
```

> [!NOTE]
> Using bun may cause problems when building Vivliostyle due to compatibility with Playwright.

Add to `nuxt.config`:

```ts
defineNuxtConfig({
  extends: '@e-chan1007/nuxt-vivliostyle'
})
```

`nuxt dev` will start the server, and `nuxt generate` will build the Vivliostyle book.

## Extend Example

### `~/content/book-example/config.yml`
Values will be passed to Vivliostyle CLI at build time.

```yaml
title: The Example Book
author: e-chan1007
size: A4
cover: /book-example/cover.png # Refers ~/public/book-example/cover.png
props: # The props not related to Vivliostyle can be in `props`
  hello: World
```

### `~/content/book-example/1.book.md`
Manuscripts will automatically read and passed to Vivliostyle CLI.
Ordering and ignoring can work according to the [Content Directory](https://content.nuxt.com/usage/content-directory) specification.
All images should be placed in `~/public` and referenced with the absolute path.

```md
---
title: First Chapter
---

# Hello World!
```

### `~/components/BookPageContainer.vue`
If you want to apply CSS or change the layout of the page, place the `BookPageContainer.vue` to override the layer.

```vue
<script lang="ts" setup>
import type { ParsedContentMeta } from "@nuxt/content";

const { bookMeta, page } = defineProps<{
  bookMeta: ParsedContentMeta;
  page: ParsedContentMeta;
}>();

// Inject custom CSS variable
setBookCSSVariable("pub-date", () => new Date().toDateString());
</script>

<template>
  <header>
    <!-- Access to the frontmatter -->
    <h1>{{ page.title }}</h1>
  </header>
  <!-- <BookPageRenderer> is always required to render page and inject CSS variables -->
  <BookPageRenderer :book-meta="bookMeta" :page="page" />
</template>

<!-- You can apply custom theme -->
<style src="~/assets/styles/book/theme.css" scoped />
```

### `~/assets/styles/book/theme.css`
```scss
@page {
  size: A4;
  margin: 2cm;

  @top-center {
    // values in the config root can be accessed with the prefix --book
    content: var(--book-title);
  }
  @bottom-center {
    content: counter(page);
  }
  @bottom-right {
    // custom variable
    content: var(--pub-date);
  }
}
```

In default, these variables are defined:

- `--book-***`: in the root of `~/content/[book-id]/config.yml`
- `--book-props-***`: in the `props` section of `~/content/[book-id]/config.yml`
- `--page-***`: in the frontmatter of `~/content/[book-id]/[slug].md`
