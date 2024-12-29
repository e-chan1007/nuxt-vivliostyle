<script lang="ts" setup>
const route = useRoute();
const bookId =
  typeof route.params.book === "string"
    ? route.params.book
    : route.params.book?.[0];
const pageId =
  typeof route.params.page === "string"
    ? route.params.page
    : route.params.page?.[0];

const actualPath = pageId ? `/raw/${bookId}/${pageId}` : `/raw/${bookId}`;
const viewerPath = `/_viewer/index.html#src=${actualPath}`;
</script>

<template>
  <iframe :src="viewerPath" class="viewer" ref="viewer" />
</template>

<style>
html, body, #__nuxt {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.viewer {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
