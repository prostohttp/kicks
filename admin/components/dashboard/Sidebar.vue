<script lang="ts" setup></script>

<template>
  <div
    class="bg-fa-white h-svh w-[260px] border-r border-[#cfcfcf] dark:border-gray-main dark:bg-dark-gray py-[32px] px-[24px]"
  >
    <NuxtLink to="/dashboard" class="flex justify-center mb-[62px]">
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
