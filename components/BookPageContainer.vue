<script lang="ts" setup>
import type { ParsedContentMeta } from '@nuxt/content';
import { useBookPage } from '~/composables/useBookPage';

const { page: propPage } = defineProps<{ page?: ParsedContentMeta }>();

const slugPage = await useBookPage();
</script>

<template>
  <BookPageRenderer :page="propPage || slugPage" />
</template>

<style scoped>
@page {
  size: var(--book-size, A4);
}
</style>
