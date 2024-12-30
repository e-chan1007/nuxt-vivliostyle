<script lang="ts" setup>
import type { ParsedContentMeta } from "@nuxt/content";

const { bookMeta, page } = defineProps<{
  bookMeta: ParsedContentMeta;
  page: ParsedContentMeta;
}>();
;
</script>

<template>
  <BookPageRenderer :book-meta="bookMeta" :page="page" />
</template>

<style scoped>
@page {
  size: var(--book-size, A4);
}
</style>
