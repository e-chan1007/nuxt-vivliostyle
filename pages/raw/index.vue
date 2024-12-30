<template>
  <h1>Book Pages</h1>
  <ContentList v-slot="{ list: configList }" :query="{ where: [{ _extension: 'yml' }] }">
    <ContentList v-for="config in configList" :key="config._path" v-slot="{ list }"
      :query="{ where: [{ _extension: 'md', _dir: config._dir }] }">
      <ul>
        <li v-if="config.cover">
          <a :href="`/raw/${config._dir}/_cover`">Cover</a>
        </li>
        <li v-for="content in list" :key="content._path">
          <a :href="`/raw${content._path}`">{{ content.title }}</a>
        </li>
      </ul>
    </ContentList>
  </ContentList>
</template>
