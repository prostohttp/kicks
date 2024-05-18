<script lang="ts" setup>
import { eng } from "~/lang/eng";
import { Locales } from "~/types/ui/ui.types";
import type { NotificationDto } from "~/server/api/notification/dto/notification.dto";

// define
defineProps<{ data: NotificationDto[] | null; close: () => void }>();
</script>

<template>
  <div class="open-sans flex flex-col gap-[8px] pr-[15px]">
    <div
      v-for="notification in data"
      :key="notification._id"
      class="flex flex-col gap-[5px] bg-fa-white dark:bg-dark-gray rounded-[8px] px-[12px] py-[5px]"
    >
      <div class="flex justify-between gap-[5px] items-center pt-[5px]">
        <NuxtLink
          activeClass="active"
          :to="`/dashboard/orders/${notification._id}`"
          class="text-[16px] font-[600]"
          @click="close"
        >
          {{ eng.order }} {{ notification.order.orderId }}
        </NuxtLink>
        <span
          class="text-[12px] bg-blue dark:bg-yellow text-fa-white dark:text-dark-gray inline-flex items-center justify-center rounded-[4px] h-[24px] px-[8px] capitalize font-[500]"
        >
          {{ notification.order.status }}
        </span>
      </div>
      <ul class="flex flex-col">
        <li
          v-for="product in notification.order.products"
          :key="product.productId._id"
          class="lowercase text-[14px] font-[500]"
        >
          <NuxtLink
            activeClass="active"
            :to="`/dashboard/products/${product.productId._id}`"
            @click="close"
          >
            {{ product.productId.title }}
          </NuxtLink>
        </li>
      </ul>
      <span class="text-[12px] text-dark-gray opacity-[80%]">
        {{ dateTimeFormat(notification.createdAt, Locales.EN) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply text-dark-gray dark:text-fa-white hover:text-blue hover:dark:text-yellow;
}
</style>
