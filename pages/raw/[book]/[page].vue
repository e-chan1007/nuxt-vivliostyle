<script lang="ts" setup>
import type { ParsedContentMeta } from '@nuxt/content';
import { useBookMeta } from '~/composables/useBookMeta';
import { useBookPage } from '~/composables/useBookPage';

const bookMeta = await useBookMeta();
const page = await useBookPage();

if (!bookMeta.value || !page.value) throw createError({ status: 404 });
</script>

<template>
  <BookPageContainer :book-meta="(bookMeta as ParsedContentMeta)" :page="(page as ParsedContentMeta)" />
</template>
