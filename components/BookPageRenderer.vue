<script lang="ts" setup>
import { injectBookCSSVariables } from "~/composables/useBookCSSVariables";
import { useBookMeta } from "~/composables/useBookMeta";
import { useBookPage } from "~/composables/useBookPage";

const bookMeta = await useBookMeta();
const page = await useBookPage();
if(bookMeta.value && page.value) injectBookCSSVariables(bookMeta.value, page.value);
</script>

<template>
  <ContentRenderer :key="page!._id" :value="page!" />
</template>
