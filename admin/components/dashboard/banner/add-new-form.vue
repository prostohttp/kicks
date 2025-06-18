<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { validate } from "./validator";
import type { FormErrorEvent } from "#ui/types";

interface BannerTab {
    id: number;
    title: string;
}

// store
const bannerDataStore = useBannerDataStore();
const settingsDataStore = useSettingsDataStore();
bannerDataStore.clearBanner();
const { banner } = storeToRefs(bannerDataStore);

// vars
const isLoading = ref(false);
const isAdmin = checkIsAdmin();
const toast = useToast();
const activeTab = ref(0);
const bannerTabs: Ref<BannerTab[]> = ref(
    banner.value.banners.map((banner) => ({
        id: banner.id,
        title: `${locale[settingsDataStore.locale].newBanner} ${banner.sort}`,
    })),
);
const isValidForm = ref(true);

// handlers
const clearState = () => {
    isLoading.value = true;
    setTimeout(() => {
        bannerDataStore.clearBanner();
        isValidForm.value = true;
        bannerTabs.value = [];
        activeTab.value = 0;
        isLoading.value = false;
    }, 300);
};

const submitHandler = async () => {
    try {
        await $fetch("/api/banner/add", {
            method: "POST",
            body: {
                title: banner.value.title,
                banners: banner.value.banners,
            },
        });
        clearState();
        toast.add({
            title: "Banner added",
            color: "green",
        });
    } catch (error: any) {
        toast.add({ title: error.message, color: "red" });
    }
};

const onSubmit = useThrottleFn(submitHandler, 2000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));

const addNewBanner = () => {
    const id = Date.now();
    banner.value.banners.push({
        id,
        heading: "",
        description: "",
        image: "",
        url: "",
        sort: undefined,
    });
    bannerTabs.value.push({
        id,
        title: locale[settingsDataStore.locale].newBanner,
    });
};

const deleteBanner = (id: number) => {
    banner.value.banners.splice(id, 1);
    bannerTabs.value.splice(id, 1);
};

async function onError(event: FormErrorEvent) {
    if (event.errors.length && banner.value.banners.length > 1) {
        isValidForm.value = false;
    } else {
        isValidForm.value = true;
    }
}

// hooks
</script>

<template>
    <UiSpinner v-if="isLoading" />
    <div v-else class="space-y-4 w-full">
        <div
            v-if="!isValidForm"
            class="bg-dark-gray dark:bg-yellow text-fa-white dark:text-dark-gray w-full text-center py-[5px] rounded-[8px]"
        >
            {{ locale[settingsDataStore.locale].error.checkRequiredFields }}
        </div>
        <UForm
            :state="banner"
            :validate="validate"
            class="space-y-4 w-full"
            @error="onError"
            @submit="protectedSubmitHandler"
        >
            <UFormGroup
                :label="locale[settingsDataStore.locale].title"
                :ui="{
                    label: {
                        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                    },
                }"
                name="title"
            >
                <UInput
                    v-model="banner.title"
                    :placeholder="locale[settingsDataStore.locale].title"
                    inputClass="no-left-icon"
                />
            </UFormGroup>
            <div
                class="flex flex-col lg:flex-row gap-[40px] py-[20px] justify-between"
            >
                <div class="flex flex-col gap-[10px] lg:w-[30%] w-full">
                    <UButton
                        class="icon-button float-right mr-[15px] mb-[10px]"
                        icon="i-heroicons-plus-circle-16-solid"
                        type="button"
                        @click="addNewBanner"
                    >
                        {{ locale[settingsDataStore.locale].addNewBanner }}
                    </UButton>
                    <div
                        v-for="(tab, index) in bannerTabs"
                        :key="tab.id"
                        :class="{ 'active-tab': activeTab === index }"
                        class="cursor-pointer py-[10px] pl-[20px] pr-[10px] rounded-[8px] flex justify-between items-center"
                        @click="activeTab = index"
                    >
                        <span>{{
                            `${locale[settingsDataStore.locale].newBanner} ${banner.banners[index].sort || ""}`
                        }}</span>
                        <UButton
                            class="icon-button"
                            icon="i-heroicons-minus-circle-16-solid"
                            type="button"
                            @click="deleteBanner(index)"
                        />
                    </div>
                </div>
                <div class="lg:w-[70%] w-full">
                    <Transition>
                        <UFormGroup name="banners">
                            <DashboardBannerAddNewFormItem
                                v-for="(item, index) in banner.banners"
                                v-show="index === activeTab"
                                :id="item.id"
                                :key="item.id"
                                v-model:active-tab="activeTab"
                                :index="index"
                            />
                        </UFormGroup>
                    </Transition>
                </div>
            </div>
            <UButton v-if="isAdmin" class="dark-button float-end" type="submit">
                {{ locale[settingsDataStore.locale].save }}
            </UButton>
        </UForm>
    </div>
</template>

<style scoped>
.active-tab {
    @apply bg-dark-gray text-fa-white dark:bg-dark-bg dark:text-fa-white;
}

.active-tab .icon-button {
    @apply text-fa-white;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
