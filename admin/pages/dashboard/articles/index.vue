<script lang="ts" setup>
import { eng } from "~/lang/eng";
import { Constants } from "~/constants";
import type { ArticleDto } from "~/server/api/article/dto/article.dto";

// meta
useHead({
  title: eng.allArticles,
});

// vars

// handlers
const { data } = useFetch<{ articles: ArticleDto[] }>("/api/article/all", {
  method: "GET",
  query: {},
});
</script>

<template>
  <UiEmpty v-if="!data?.articles.length" />
  <div v-else>
    <ul>
      <li v-for="article in data?.articles" :key="article._id">
        <NuxtLink :to="`/dashboard/articles/${article._id}`">
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
