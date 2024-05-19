<script lang="ts" setup>
import type { BreadcrumbItem } from "~/types/ui/ui.types";
defineProps<{
  links: BreadcrumbItem[];
}>();
</script>

<template>
  <UBreadcrumb
    :links="links"
    :ui="{
      active: 'text-dark-gray dark:text-fa-white',
      inactive: 'hover:text-blue dark:hover:text-yellow',
    }"
  />
</template>
