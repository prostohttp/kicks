<script lang="ts" setup>
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { NotificationDto } from "~/server/api/notification/dto/notification.dto";

// vars

const notifications: Ref<NotificationDto[] | null> = ref([]);

const { data } = await useFetch<NotificationDto[]>("/api/notification/many", {
  method: "GET",
  query: {
    limit: Constants.NOTIFICATIONS_LIMIT,
  },
});

notifications.value = data.value;

// handlers
const isEmpty = computed(() => !notifications.value?.length);

const markAllAsRead = async () => {
  notifications.value = await $fetch("/api/notification/mark-as-read", {
    method: "GET",
    query: {
      limit: Constants.NOTIFICATIONS_LIMIT,
    },
  });
};
</script>

<template>
  <div class="flex items-center w-[40px] h-[40px] justify-center">
    <UPopover
      :popper="{ offsetDistance: 60, placement: 'bottom-end' }"
      :ui="{
        rounded: 'rounded-[8px]',
        ring: 'ring-[#e7e7e3] ring-1',
        shadow: 'shadow-none',
        width: 'md:w-auto w-[calc(100%-10px)]',
        wrapper: 'flex items-center ',
        base: 't-0',
      }"
      class="top-0"
    >
      <UIcon
        v-if="isEmpty"
        name="i-heroicons-bell"
        class="icon cursor-pointer bg-dark-gray dark:bg-fa-white w-[24px] h-[24px]"
      />
      <template v-else>
        <UChip color="red" :text="notifications?.length" size="2xl">
          <UIcon
            name="i-heroicons-bell-alert-solid"
            class="icon cursor-pointer bg-dark-gray dark:bg-fa-white w-[24px] h-[24px]"
          />
        </UChip>
      </template>

      <template #panel="{ close }">
        <div class="p-[20px] flex flex-col gap-[20px] items-start">
          <div class="flex justify-between items-center w-full gap-[30px]">
            <span class="font-[Rubik] font-[600] text-[20px]">
              {{ locale["en"].notifications }}
            </span>
            <UIcon
              name="i-heroicons-x-circle"
              @click="close"
              class="w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            />
          </div>
          <div class="md:max-h-[400px] max-h-[200px] overflow-y-auto w-full">
            <template v-if="isEmpty">
              <span>{{ locale["en"].empty }}</span>
            </template>
            <LazyDashboardHeaderNotificationsList
              :data="notifications"
              :close="close"
              v-else
            />
          </div>
          <div
            v-if="!isEmpty"
            class="flex justify-between items-center w-full uppercase mt-[10px] gap-[40px]"
          >
            <NuxtLink
              class="flex justify-between items-center text-dark-gray dark:text-fa-white hover:text-blue dark:hover:text-yellow gap-[6px] cursor-pointer"
              @click="markAllAsRead"
            >
              <UIcon
                name="i-heroicons-check-20-solid"
                class="w-[20px] h-[20px] flex items-center justify-center"
              />
              <span>{{ locale["en"].markAllAsRead }}</span>
            </NuxtLink>
            <NuxtLink
              activeClass="active"
              to="/dashboard/notifications"
              class="bg-dark-gray text-fa-white px-[16px] py-[8px] rounded-[8px] hover:text-fa-white hover:bg-blue dark:bg-fa-white dark:text-dark-gray dark:hover:bg-yellow dark:hover:text-dark-gray"
              @click="close"
            >
              {{ locale["en"].viewAllNotifications }}
            </NuxtLink>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style scoped>
.active {
  @apply bg-dark-gray text-fa-white hover:bg-blue dark:bg-fa-white dark:text-dark-gray dark:hover:bg-yellow;
}

div[data-headlessui-state="open"] .icon {
  @apply bg-blue dark:bg-yellow;
}
</style>
