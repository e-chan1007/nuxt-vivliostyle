<template>
  <h1>Books</h1>
  <ContentList path="/" v-slot="{ list }" :query="{ where: [{ _extension: 'yml' }] }">
    <ul>
      <li v-for="content in list" :key="content._path?.replace('config', '')">
        <a :href="content._path?.replace('config', '')">{{ content.title }}</a>
      </li>
    </ul>
  </ContentList>
</template>
