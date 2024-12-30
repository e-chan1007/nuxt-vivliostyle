<script lang="ts" setup>
const route = useRoute();
const bookId =
  typeof route.params.book === "string"
    ? route.params.book
    : route.params.book?.[0];
if (!bookId) throw createError({ status: 404 });
const { data: bookMeta } = await useAsyncData(`books.${bookId}.meta`, () =>
  queryContent(bookId)
    .where({ _extension: { $eq: "yml" } })
    .findOne(),
);

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
:global(body) {
  margin: 0;
}
[role="doc-cover"] {
  display: block;
  width: 100vw;
  height: 100vh;
  object-fit: contain;
}
@page {
  margin: 0;
  size: var(--book-size, A4);
}
</style>
