<script lang="ts" setup>
import type { ParsedContent } from "@nuxt/content";
import { resolveBookCSSVariables, type BookCSSVariableValue } from "~/composables/useBookCSSVariables";

const { bookMeta, page } = defineProps<{
  bookMeta: ParsedContent | null;
  page: ParsedContent | null;
}>();

if(bookMeta && page) {
  const variables = resolveBookCSSVariables(bookMeta, page);
  const isValid = (v: unknown): v is BookCSSVariableValue => typeof v === "string" || typeof v === "boolean" || typeof v === "number";
  const toValue = (v: BookCSSVariableValue): string =>typeof v === "string" ? `"${v}"` : v.toString();

  useServerHead({
    style: [
      {
        innerHTML: `
  :root {
    ${Object.entries(bookMeta ?? {})
      .filter(([_, v]) => isValid(v))
      .map(([k, v]) => `--book-${k}: ${toValue(v)};`).join("\n    ")
    }
    ${Object.entries(bookMeta?.props ?? {})
      .filter((v): v is [string, BookCSSVariableValue] => isValid(v[1]))
      .map(([k, v]) => `--book-props-${k}: ${toValue(v)};`).join("\n    ")}
    ${Object.entries(variables)
      .filter(([_, v]) => isValid(v))
      .map(([k, v]) => `--${k}: ${toValue(v)};`)
      .join("\n    ")}
  }
  `,
      },
    ],
  });
}
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
