<script lang="ts" setup>
import type { ParsedContent } from "@nuxt/content";

const { bookMeta, page } = defineProps<{
  bookMeta: ParsedContent | null;
  page: ParsedContent | null;
}>();

useServerHead({
  style: [
    {
      innerHTML: `
      :root {
        ${Object.entries(bookMeta?.props ?? {})
          .map(([k, v]) => `--book-props-${k}: "${v}";`)
          .join("\n")}
      }
    `,
    },
  ],
});
</script>

<template>
  <div class="book-page" v-if="page">
    <ContentRenderer :key="page._id" :value="page" />
  </div>
</template>

<style>
.book-page {
  break-before: page;
}
</style>
