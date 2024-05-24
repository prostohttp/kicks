<script lang="ts" setup>
import { Constants } from "~/constants";

const isOpenMobileSidebar = inject(Constants.PROVIDE_IS_OPEN_MOBILE_SIDEBAR);
</script>

<template>
  <div
    class="bg-fa-white h-dvh overflow-auto w-[260px] border-r border-[#cfcfcf] dark:border-gray-main dark:bg-dark-gray md:pt-[32px] pt-[10px] px-[24px]"
  >
    <NuxtLink
      to="/"
      class="flex justify-center mb-[46px]"
      @click="isOpenMobileSidebar = false"
    >
      <img
        src="~/assets/img/small-logo.svg"
        alt="kicks"
        class="w-[128px] dark:invert-[1] dark:invert-1"
      />
    </NuxtLink>
    <DashboardSidebarMenu />
    <DashboardSidebarCategories />
  </div>
</template>
