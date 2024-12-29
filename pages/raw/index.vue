<template>
  <h1>Book Pages</h1>
  <ContentList path="/" v-slot="{ list }" :query="{ where: [{ _extension: 'md' }] }">
    <ul>
      <li v-for="content in list" :key="content._path">
        <a :href="`/raw${content._path}`">{{ content.title }}</a>
      </li>
    </ul>
  </ContentList>
</template>
