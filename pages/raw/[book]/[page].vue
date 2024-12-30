<script lang="ts" setup>
import type { ParsedContentMeta } from '@nuxt/content';

const route = useRoute();
const bookId =
  typeof route.params.book === "string"
    ? route.params.book
    : route.params.book?.[0];
const pageId =
  typeof route.params.page === "string"
    ? route.params.page
    : route.params.page?.[0];
if (!bookId || !pageId) throw createError({ status: 404 });
const { data: bookMeta } = await useAsyncData(`books.${bookId}.meta`, () =>
  queryContent(bookId)
    .where({ _extension: { $eq: "yml" } })
    .findOne(),
);
const { data: page } = await useAsyncData(
  `books.${bookId}.pages.${pageId}`,
  () => queryContent(bookId, pageId).findOne(),
);

if (!bookMeta || !page) throw createError({ status: 404 });
</script>

<template>
  <BookPageContainer :book-meta="(bookMeta as ParsedContentMeta)" :page="(page as ParsedContentMeta)" />
</template>
