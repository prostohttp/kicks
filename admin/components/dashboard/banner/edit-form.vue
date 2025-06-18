<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { validate } from "./validator";
import type { FormErrorEvent } from "#ui/types";

interface BannerTab {
    id: number;
    title: string;
    sort?: number;
}

// store
const bannerDataStore = useBannerDataStore();
const settingsDataStore = useSettingsDataStore();
const { banner } = storeToRefs(bannerDataStore);

// vars
const title = ref(banner.value.title);
const isLoading = ref(false);
const isAdmin = checkIsAdmin();
const toast = useToast();
const activeTab = ref(0);
const bannerTabs: Ref<BannerTab[]> = ref(
    banner.value.banners
        .map((banner) => ({
            id: banner.id,
            title: `${locale[settingsDataStore.locale].newBanner} ${banner.sort}`,
            sort: banner.sort,
        }))
        .sort((a, b) => a.sort! - b.sort!),
);
const isValidForm = ref(true);

// handlers
const submitHandler = async () => {
    try {
        await $fetch("/api/banner/edit", {
            method: "PUT",
            body: {
                _id: banner.value._id,
                title: title.value,
                banners: banner.value.banners,
            },
        });
        await bannerDataStore.getBannerById(banner.value._id!);
        isValidForm.value = true;
        toast.add({
            title: locale[settingsDataStore.locale].successEdit,
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
        sort: undefined,
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

const deleteBannerHandler = () => {
    try {
        bannerDataStore.deleteBanner(banner.value._id!);
        toast.add({
            title: locale[settingsDataStore.locale].successDeleteMessage,
        });
        navigateTo("/dashboard/banners?page=1");
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
};

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
                    v-model="title"
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
                        <span>
                            {{
                                `${locale[settingsDataStore.locale].newBanner} ${banner.banners[index].sort || ""}`
                            }}
                        </span>
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
                            <DashboardBannerEditFormItem
                                v-for="(item, index) in banner.banners"
                                v-show="index === activeTab"
                                :key="item.id"
                                v-model:active-tab="activeTab"
                                :index="index"
                            />
                        </UFormGroup>
                    </Transition>
                </div>
            </div>
            <div
                v-if="isAdmin"
                class="flex items-center gap-[20px] justify-end"
            >
                <UButton
                    class="bg-danger dark:bg-danger text-fa-white hover:bg-danger hover:dark:bg-danger big-button"
                    type="button"
                    @click="deleteBannerHandler"
                >
                    {{ locale[settingsDataStore.locale].delete }}
                </UButton>
                <UButton class="dark-button" type="submit">
                    {{ locale[settingsDataStore.locale].save }}
                </UButton>
            </div>
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
