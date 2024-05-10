<script lang="ts" setup></script>

<template>
  <div class="dark:text-fa-white dark:bg-dark-gray flex open-sans">
    <DashboardSidebar />
    <div class="w-full bg-grey dark:bg-dark-gray flex flex-col">
      <DashboardHeader />
      <div class="py-[24px] pl-[24px] pr-[48px]">
        <slot />
      </div>
      <DashboardFooter class="mt-auto" />
    </div>
  </div>
</template>
