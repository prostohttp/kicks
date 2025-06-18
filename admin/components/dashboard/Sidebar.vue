<script lang="ts" setup>
import { Constants } from "~/constants";

// inject
const isOpenMobileSidebar = inject(Constants.PROVIDE_IS_OPEN_MOBILE_SIDEBAR);

// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => settingsDataStore.getSettings());
const { settings } = storeToRefs(settingsDataStore);
</script>

<template>
    <div
        class="bg-fa-white h-dvh md:h-auto overflow-auto min-w-[260px] w-[260px] border-r border-[#cfcfcf] dark:border-gray-main dark:bg-dark-gray md:pt-[32px] pt-[10px] px-[24px]"
    >
        <NuxtLink
            class="flex justify-center mb-[46px]"
            to="/"
            @click="isOpenMobileSidebar = false"
        >
            <img
                v-if="settings?.image"
                :src="`/${settings.image}`"
                alt="kicks"
                class="w-[128px] dark:invert-[1] dark:invert-1"
            />
            <img
                v-else
                alt="kicks"
                class="w-[128px] dark:invert-[1] dark:invert-1"
                src="~/assets/img/small-logo.svg"
            />
        </NuxtLink>
        <DashboardSidebarMenu />
        <DashboardSidebarCategories />
    </div>
</template>
