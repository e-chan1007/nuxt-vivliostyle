<script lang="ts" setup>
import type { ParsedContentMeta } from "@nuxt/content";
import { injectBookCSSVariables } from "~/composables/useBookCSSVariables";

const { bookMeta, page } = defineProps<{
  bookMeta: ParsedContentMeta;
  page: ParsedContentMeta;
}>();

if(bookMeta && page) injectBookCSSVariables(bookMeta, page);
</script>

<template>
  <ContentRenderer :key="page._id" :value="page" />
</template>
