<script lang="ts" setup>
import { useBookMeta } from '~/composables/useBookMeta';

const bookMeta = await useBookMeta();

if (!bookMeta.value?.cover) throw createError({ status: 404 });
const cover = bookMeta.value.cover;

injectBookCSSVariables(bookMeta.value, { _id: bookMeta.value.cover });
</script>

<template>
  <section role="region" aria-label="Cover">
    <img role="doc-cover" :src="cover" alt="Cover" />
  </section>
</template>

<style scoped>
[role="doc-cover"] {
  display: block;
  width: 100vw;
  height: 100vh;
  object-fit: contain;
  page: cover;
  z-index: 1000;
  position: fixed;
}
@page cover {
  margin: 0;
  size: var(--book-size);

  @top-left-corner { content: ""; }
  @top-left { content: ""; }
  @top-center { content: ""; }
  @top-right { content: ""; }
  @top-right-corner { content: ""; }
  @left-top { content: ""; }
  @left-middle { content: ""; }
  @left-bottom { content: ""; }
  @right-top { content: ""; }
  @right-middle { content: ""; }
  @right-bottom { content: ""; }
  @bottom-left-corner { content: ""; }
  @bottom-left { content: ""; }
  @bottom-center { content: ""; }
  @bottom-right { content: ""; }
  @bottom-right-corner { content: ""; }
}
</style>
