<script lang="ts" setup>
// store
const articleDataStore = useArticleDataStore();
const { forAdminMenu } = storeToRefs(articleDataStore);

// handlers
await articleDataStore.getAllArticlesForAdminMenu();
</script>

<template>
    <ul class="font-[600] flex gap-[16px]">
        <li v-for="{ _id, title } in forAdminMenu" :key="_id">
            <NuxtLink :to="'/dashboard/articles/' + _id">{{ title }}</NuxtLink>
        </li>
    </ul>
</template>
