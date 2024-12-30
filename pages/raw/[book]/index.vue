<script lang="ts" setup>
import type { ParsedContentMeta } from '@nuxt/content';

const route = useRoute();
const bookId =
  typeof route.params.book === "string"
    ? route.params.book
    : route.params.book?.[0];
if (!bookId) throw createError({ status: 404 });
const { data: bookMeta } = await useAsyncData(`books.${bookId}.meta`, () =>
  queryContent(bookId).where({ _extension: "yml" }).findOne(),
);
const { data: pages } = await useAsyncData(`book.${bookId}.pages`, () =>
  queryContent(bookId).where({ _extension: "md" }).find(),
);
if (!bookMeta || !pages) throw createError({ status: 404 });
</script>

<template>
  <div class="book-page"  v-for="page in pages" :key="page._id">
    <BookPageContainer :book-meta="(bookMeta as ParsedContentMeta)" :page="page" />
  </div>
</template>

<style scoped>
.book-page {
  break-before: page;
}
</style>
