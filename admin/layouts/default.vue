<script lang="ts" setup>
import { Constants } from "~/constants";

// browser
const cookieLocale = useCookie("locale");
const cookieCurrency = useCookie("currency");

// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => settingsDataStore.getLocale());
await useAsyncData(() => settingsDataStore.getCurrency());
const { locale, currency } = storeToRefs(settingsDataStore);
// TODO: вариант с использованием cookie для схем в отдельных файлах, игра не стоит свеч, там где схемы имеют небольшой объем кода, для примера реализовано на settings
cookieLocale.value = locale.value;
cookieCurrency.value = currency.value;

// vars
const isOpen = ref(false);
provide(Constants.PROVIDE_IS_OPEN_MOBILE_SIDEBAR, isOpen);
</script>

<template>
    <div class="dark:text-fa-white dark:bg-dark-gray flex open-sans min-h-dvh">
        <DashboardSidebar class="hidden md:block" />
        <USlideover
            v-model="isOpen"
            :ui="{
                base: 'sidebar',
            }"
            class="md:hidden flex flex-col"
            side="left"
        >
            <div
                class="flex items-center justify-end px-[10px] pt-[10px] bg-fa-white dark:bg-dark-gray border-r border-[#cfcfcf] dark:border-gray-main"
            >
                <UButton
                    class="-my-1"
                    color="gray"
                    icon="i-heroicons-x-mark-20-solid"
                    variant="ghost"
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
                    class="md:hidden bg-blue hover:bg-blue dark:hover:bg-yellow h-[34px] w-[34px] flex items-center justify-center"
                    icon="i-heroicons-bars-3-bottom-left"
                    size="xl"
                    @click="isOpen = true"
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
