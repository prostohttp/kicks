<script lang="ts" setup>
import type { BreadcrumbItem } from "~/types/ui/ui.types";
// define
defineProps<{
    links: BreadcrumbItem[];
    title: string;
}>();
</script>

<template>
    <header class="mb-[24px] sm:text-left text-center">
        <h1 class="page-title">{{ title }}</h1>
        <UBreadcrumb
            :links="links"
            :ui="{
                active: 'text-dark-gray dark:text-fa-white',
                inactive: 'hover:text-blue dark:hover:text-yellow',
            }"
        />
    </header>
</template>
