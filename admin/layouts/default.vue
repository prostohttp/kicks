<script lang="ts" setup>
import { Constants } from "~/constants";

// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData("settingsLocale", () => settingsDataStore.getLocale());

// vars
const isOpen = ref(false);
provide(Constants.PROVIDE_IS_OPEN_MOBILE_SIDEBAR, isOpen);
</script>

<template>
  <div class="dark:text-fa-white dark:bg-dark-gray flex open-sans min-h-dvh">
    <DashboardSidebar class="hidden md:block" />
    <USlideover
      v-model="isOpen"
      side="left"
      class="md:hidden flex flex-col"
      :ui="{
        base: 'sidebar',
      }"
    >
      <div
        class="flex items-center justify-end px-[10px] pt-[10px] bg-fa-white dark:bg-dark-gray border-r border-[#cfcfcf] dark:border-gray-main"
      >
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="isOpen = false"
        />
      </div>
      <DashboardSidebar />
    </USlideover>
    <div class="w-full bg-grey dark:bg-dark-gray flex flex-col">
      <div
        class="flex items-center w-full justify-between pl-[20px] pt-[10px] md:pt-0 bg-fa-white border-[#cfcfcf] dark:border-gray-main dark:bg-dark-gray border-b"
      >
        <UButton
          active-class="active"
          size="xl"
          icon="i-heroicons-bars-3-bottom-left"
          @click="isOpen = true"
          class="md:hidden bg-blue hover:bg-blue dark:hover:bg-yellow h-[34px] w-[34px] flex items-center justify-center"
        />
        <DashboardHeader />
      </div>
      <div
        class="py-[24px] pl-[24px] lg:pr-[40px] pr-[20px] overflow-x-auto h-full flex flex-col"
      >
        <slot />
      </div>
      <DashboardFooter class="mt-auto" />
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply bg-blue dark:bg-yellow;
}
</style>
