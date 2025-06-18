<script lang="ts" setup>
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { NotificationDto } from "~/server/api/notification/dto/notification.dto";

// store
const settingsDataStore = useSettingsDataStore();

// vars
const isAdmin = checkIsAdmin();
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
    if (isAdmin) {
        notifications.value = await $fetch("/api/notification/mark-as-read", {
            method: "GET",
            query: {
                limit: Constants.NOTIFICATIONS_LIMIT,
            },
        });
    }
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
                class="icon cursor-pointer bg-dark-gray dark:bg-fa-white w-[24px] h-[24px]"
                name="i-heroicons-bell"
            />
            <template v-else>
                <UChip :text="notifications?.length" color="red" size="2xl">
                    <UIcon
                        class="icon cursor-pointer bg-dark-gray dark:bg-fa-white w-[24px] h-[24px]"
                        name="i-heroicons-bell-alert-solid"
                    />
                </UChip>
            </template>

            <template #panel="{ close }">
                <div class="p-[20px] flex flex-col gap-[20px] items-start">
                    <div
                        class="flex justify-between items-center w-full gap-[30px]"
                    >
                        <span class="font-[Rubik] font-[600] text-[20px]">
                            {{ locale[settingsDataStore.locale].notifications }}
                        </span>
                        <UIcon
                            class="w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                            name="i-heroicons-x-circle"
                            @click="close"
                        />
                    </div>
                    <div
                        class="md:max-h-[400px] max-h-[200px] overflow-y-auto w-full"
                    >
                        <template v-if="isEmpty">
                            <span>{{
                                locale[settingsDataStore.locale].empty
                            }}</span>
                        </template>
                        <DashboardHeaderNotificationsList
                            v-else
                            :close="close"
                            :data="notifications"
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
                                class="w-[20px] h-[20px] flex items-center justify-center"
                                name="i-heroicons-check-20-solid"
                            />
                            <span>{{
                                locale[settingsDataStore.locale].markAllAsRead
                            }}</span>
                        </NuxtLink>
                        <NuxtLink
                            activeClass="active"
                            class="bg-dark-gray text-fa-white px-[16px] py-[8px] rounded-[8px] hover:text-fa-white hover:bg-blue dark:bg-fa-white dark:text-dark-gray dark:hover:bg-yellow dark:hover:text-dark-gray"
                            to="/dashboard/notifications"
                            @click="close"
                        >
                            {{
                                locale[settingsDataStore.locale]
                                    .viewAllNotifications
                            }}
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
