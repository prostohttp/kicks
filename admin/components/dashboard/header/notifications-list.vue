<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { Locales } from "~/types/ui/ui.types";
import type { NotificationDto } from "~/server/api/notification/dto/notification.dto";
import dateTimeFormat from "~/utils/date-time-format";

// define
defineProps<{ data: NotificationDto[] | null; close: () => void }>();

// store
const settingsDataStore = useSettingsDataStore();
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
                    :to="`/dashboard/orders/${notification._id}`"
                    activeClass="active"
                    class="text-[16px] font-[600]"
                    @click="close"
                >
                    {{ locale[settingsDataStore.locale].order }}
                    {{ notification.order?.orderId }}
                </NuxtLink>
                <span
                    class="text-[12px] bg-blue dark:bg-yellow text-fa-white dark:text-dark-gray inline-flex items-center justify-center rounded-[4px] h-[24px] px-[8px] font-[500]"
                >
                    {{ notification.order?.status[settingsDataStore.locale] }}
                </span>
            </div>
            <ul class="flex flex-col">
                <li
                    v-for="product in notification.order.products"
                    :key="product.productId?._id"
                    class="lowercase text-[14px] font-[500]"
                >
                    <NuxtLink
                        :to="`/dashboard/products/${product.productId?._id}`"
                        activeClass="active"
                        @click="close"
                    >
                        {{ product.productId?.title }}
                    </NuxtLink>
                </li>
            </ul>
            <span class="text-[12px] text-dark-gray opacity-[80%]">
                {{ dateTimeFormat(notification.createdAt, Locales.en) }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.active {
    @apply text-dark-gray dark:text-fa-white hover:text-blue hover:dark:text-yellow;
}
</style>
