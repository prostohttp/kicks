<script lang="ts" setup>
import type { NotificationDto } from "~/server/api/notification/dto/notification.dto";

// vars
const { data: notifications } = await useFetch<NotificationDto[]>(
  "/api/notification/all",
  {
    method: "GET",
    query: {
      forUi: true,
      forUiLimit: 10,
    },
  },
);
</script>

<template>
  <div class="flex items-center">
    <UPopover :popper="{ offsetDistance: 60, placement: 'bottom-end' }">
      <UIcon
        name="i-heroicons-bell"
        class="cursor-pointer scale-[1.7] bg-dark-gray dark:bg-fa-white"
      />

      <template #panel>
        <div class="p-4">
          <pre>
            {{ notifications }}
          </pre>
        </div>
      </template>
    </UPopover>
  </div>
</template>
