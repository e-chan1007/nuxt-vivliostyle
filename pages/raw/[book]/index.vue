<script lang="ts" setup>
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

definePageMeta({
  layout: "raw-book-page",
});
</script>

<template>
  <BookPageRenderer v-for="page in pages" :key="page._id" :book-meta="bookMeta" :page="page" />
</template>
