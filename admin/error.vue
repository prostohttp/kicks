<script setup lang="ts">
import type { NuxtError } from "#app";
import { locale } from "./lang/locale";

// store
const settingsDataStore = useSettingsDataStore();

// vars
const { data } = useAuth();

// props
const { error } = defineProps({
    error: Object as () => NuxtError,
});

// handlers
const errorHandle = () => {
    clearError({ redirect: "/" });
};

const computedErrorMessage = computed(() => {
    if (error?.statusCode === 404) {
        return locale[settingsDataStore.locale].pageNotFound;
    } else {
        return (
            error?.message ||
            locale[settingsDataStore.locale].somethingWentWrong
        );
    }
});

// meta
useHead({
    title: computedErrorMessage.value,
});
</script>

<template>
    <div v-if="data">
        <NuxtLayout name="error">
            <div
                class="flex flex-col justify-center items-center py-[50px] gap-[20px] px-[20px] xl:px-0 dark:text-white"
            >
                <h1 class="text-[4em] font-[Rubik]">{{ error!.statusCode }}</h1>
                <p>{{ computedErrorMessage }}</p>
                <UButton
                    color="black"
                    variant="solid"
                    size="xl"
                    @click="errorHandle"
                >
                    {{ locale[settingsDataStore.locale].backToHome }}
                </UButton>
            </div>
        </NuxtLayout>
    </div>
    <div
        class="flex flex-col justify-center items-center h-dvh gap-[20px] px-[20px] xl:px-0 dark:text-white"
        v-else
    >
        <img
            src="~/assets/img/large-logo.svg"
            alt="kicks logo"
            class="mb-[50px] lg:max-w-[100%] max-w-[300px]"
        />
        <h1 class="text-[4em] font-[Rubik]">{{ error!.statusCode }}</h1>
        <p>{{ computedErrorMessage }}</p>
        <UButton color="black" variant="solid" size="xl" @click="errorHandle">
            {{ locale[settingsDataStore.locale].backToHome }}
        </UButton>
    </div>
</template>
