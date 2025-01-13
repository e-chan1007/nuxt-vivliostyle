<script lang="ts" setup>
import type { ParsedContentMeta } from "@nuxt/content";
import { injectBookCSSVariables } from "~/composables/useBookCSSVariables";
import { useBookMeta } from "~/composables/useBookMeta";
import { useBookPage } from "~/composables/useBookPage";

const { page: propPage } = defineProps<{ page?: ParsedContentMeta }>();
const bookMeta = await useBookMeta();
const slugPage = await useBookPage();
const page = propPage || slugPage;
if(bookMeta.value && page.value) injectBookCSSVariables(bookMeta.value, page.value);
</script>

<template>
  <ContentRenderer :key="page!._id" :value="page!" />
</template>
