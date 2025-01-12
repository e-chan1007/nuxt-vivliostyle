<script lang="ts" setup>
import { useBookMeta } from "~/composables/useBookMeta";
import CoverPage from "./_cover.vue";
import type { ParsedContentMeta } from '@nuxt/content';
import { useBookPages } from "~/composables/useBookPage";

const bookMeta = await useBookMeta();
const pages = await useBookPages();

if (!bookMeta.value || !pages.value) throw createError({ status: 404 });
</script>

<template>
  <CoverPage v-if="(bookMeta as ParsedContentMeta).cover" />
  <div class="book-page"  v-for="page in pages" :key="page._id">
    <BookPageContainer :book-meta="(bookMeta as ParsedContentMeta)" :page="page" />
  </div>
</template>

<style scoped>
.book-page {
  break-before: page;
}
</style>
