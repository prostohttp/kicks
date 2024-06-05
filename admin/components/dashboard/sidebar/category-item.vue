<script lang="ts" setup>
import { Constants } from "~/constants";

// define
defineProps<{
  _id: string;
  title: string;
  count: number;
}>();

// vars
const isOpenMobileSidebar = inject(Constants.PROVIDE_IS_OPEN_MOBILE_SIDEBAR);
</script>

<template>
  <li class="h-[35px] flex justify-between items-center mb-[16px]">
    <!-- TODO: изменить ссылки на страницу с товарами из категории -->
    <NuxtLink
      class="text-[16px] font-[600] text-dark-gray dark:text-fa-white"
      @click="isOpenMobileSidebar = false"
    >
      {{ title }}
    </NuxtLink>
    <NuxtLink
      activeClass="active"
      class="flex items-center justify-center bg-[#e7e7e3] font-[600] rounded-[4px] w-[41px] h-[35px] hover:bg-blue hover:text-fa-white dark:hover:bg-yellow dark:hover:text-dark-gray dark:text-dark-gray"
      @click="isOpenMobileSidebar = false"
    >
      {{ count }}
    </NuxtLink>
  </li>
</template>

<style scoped>
.active {
  @apply bg-blue text-fa-white dark:bg-yellow dark:text-dark-gray;
}
</style>
