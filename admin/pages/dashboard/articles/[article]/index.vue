<script lang="ts" setup>
import type { ArticleDto } from "~/server/api/article/dto/article.dto";

// vars
const articleId = useRoute().params.article;

// handlers
const { data: article, error } = await useFetch<ArticleDto>(
  `/api/article/one`,
  {
    method: "GET",
    query: {
      id: articleId,
    },
  },
);

// meta
useHead({
  title: article.value ? article.value.title : "Article",
});
</script>

<template>
  <div>
    <div v-if="error">Nothing Found</div>
    <div v-else>{{ article?.title }}</div>
  </div>
</template>
