<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import { locale } from "~/lang/locale";
import { useProductDataStore } from "~/stores/product-data";
import { usePersistDataStore } from "~/stores/persist-data.js";
import type { InputData } from "~/types/ui/ui.types";
import { Constants } from "~/constants";
import * as v from "valibot";
import { checkIsAdmin } from "~/utils/check-is-admin";

// define
const { articleData } = defineProps<{ articleData: InputData[] }>();

// Store
const articleDateStore = useArticleDataStore();
const settingsDataStore = useSettingsDataStore();
const persistDataStore = usePersistDataStore();
const productDataStore = useProductDataStore();
const { titles: data } = storeToRefs(productDataStore);
const { articleImage } = storeToRefs(persistDataStore);

// Vars
const isLoading = ref(false);
const isAdmin = checkIsAdmin();
await productDataStore.getTitles();
const titles = ref(data.value.map((el) => el.title));
const toast = useToast();
const dropZoneRef = ref<HTMLInputElement | undefined>();
const state = reactive({
    title: "",
    description: "",
    shortDescription: "",
    featuredProducts: [],
    adminMenu: false,
    siteMenu: false,
    isEnabled: true,
    sort: "",
});
const schema = v.object({
    title: v.pipe(
        v.string(locale[useSettingsDataStore().locale].error.required),
        v.trim(),
        v.minLength(3, locale[useSettingsDataStore().locale].error.stringMin3),
    ),
    description: v.string(),
    shortDescription: v.pipe(
        v.string(locale[useSettingsDataStore().locale].error.required),
        v.minLength(
            10,
            locale[useSettingsDataStore().locale].error.invalidDescription,
        ),
    ),
    isEnabled: v.boolean(),
    adminMenu: v.boolean(),
    siteMenu: v.boolean(),
    featuredProducts: v.array(v.string()),
    sort: v.pipe(
        v.number(locale[useSettingsDataStore().locale].error.number),
        v.minValue(1, locale[useSettingsDataStore().locale].error.numberMin),
    ),
});

// Handlers
const clearState = () => {
    state.title = "";
    state.shortDescription = "";
    state.description = "";
    state.featuredProducts = [];
    state.adminMenu = false;
    state.isEnabled = true;
    state.siteMenu = false;
    state.sort = "";
};

const uploadImageHandler = async (formData: FormData) => {
    const uploadedImage = await $fetch("/api/image/add", {
        method: "POST",
        body: formData,
    });
    if (!uploadedImage) {
        toast.add({
            title: locale[settingsDataStore.locale].noImage,
            color: "red",
        });
    }
    return uploadedImage;
};

const uploadImage = async (e: Event) => {
    try {
        let fileInput = e.target as HTMLInputElement;
        const formData = new FormData();
        if (fileInput.files![0]) {
            formData.append("folderName", Constants.IMG_ARTICLES);
            formData.append("image", fileInput.files![0]);
        }
        articleImage.value = await uploadImageHandler(formData);
        toast.add({
            title: locale[settingsDataStore.locale].imageUploaded,
            color: "green",
        });
    } catch (_error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
    }
};

const onDrop = async (files: File[] | null) => {
    try {
        if (files) {
            const formData = new FormData();
            if (files![0]) {
                formData.append("image", files[0]);
                formData.append("folderName", Constants.IMG_ARTICLES);
            }
            const uploadedImage = await uploadImageHandler(formData);
            articleImage.value = uploadedImage;
            toast.add({
                title: locale[settingsDataStore.locale].imageUploaded,
                color: "green",
            });
        }
    } catch (error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
    }
};

useDropZone(dropZoneRef, { onDrop });

const onSubmitHandler = async (event: FormSubmitEvent<any>) => {
    isLoading.value = true;
    try {
        await $fetch("/api/article/add", {
            method: "POST",
            body: {
                title: event.data.title,
                shortDescription: event.data.shortDescription,
                description: event.data.description,
                isEnabled: event.data.isEnabled,
                adminMenu: event.data.adminMenu,
                siteMenu: event.data.siteMenu,
                image: articleImage.value || "",
                sort: event.data.sort,
                featuredProducts: data.value.filter((el) =>
                    event.data.featuredProducts?.includes(el.title),
                ),
                createdAt: new Date(),
            },
        });
        articleImage.value = "";
        toast.add({
            title: locale[settingsDataStore.locale].addNewArticle,
            color: "green",
        });
        articleDateStore.getAllArticlesForAdminMenu();
        clearState();
    } catch (error: any) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
    }
    setTimeout(() => {
        isLoading.value = false;
    }, 500);
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const deleteImageHandler = async () => {
    try {
        await $fetch("/api/image/remove", {
            method: "DELETE",
            body: {
                image: articleImage.value,
            },
        });
        articleImage.value = "";
        toast.add({
            title: locale[settingsDataStore.locale].imageDeleted,
            color: "green",
        });
    } catch (_error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
    }
};

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
    <UForm
        :schema="v.safeParser(schema)"
        :state="state"
        class="w-full flex flex-col gap-[50px]"
        @submit="protectedSubmitHandler"
    >
        <LazyUiSpinner v-if="isLoading" />
        <div v-else class="flex gap-[30px] lg:flex-row flex-col-reverse">
            <div class="width-[60%] basis-[60%] flex flex-col gap-[24px]">
                <UFormGroup
                    v-for="{ name, label, placeholder, type } in articleData"
                    :key="name"
                    :label="type !== 'toggle' ? label : ''"
                    :name="name"
                    :ui="{
                        label: {
                            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                        },
                    }"
                >
                    <UInput
                        v-if="name === 'title'"
                        v-model="state.title"
                        :placeholder="placeholder"
                        inputClass="no-left-icon"
                    />
                    <UTextarea
                        v-else-if="name === 'shortDescription'"
                        v-model="state.shortDescription"
                        :placeholder="
                            locale[settingsDataStore.locale].shortDescription
                        "
                        class="textarea"
                    />
                    <TiptapEditor
                        v-else-if="name === 'description'"
                        v-model="state.description"
                        :placeholder="placeholder"
                    />
                    <UInput
                        v-if="name === 'sort'"
                        v-model="state.sort"
                        :placeholder="placeholder"
                        inputClass="no-left-icon"
                        min="1"
                        type="number"
                    />
                    <div
                        v-else-if="name === 'siteMenu'"
                        class="flex gap-[10px] items-center mb-[10px]"
                    >
                        <UToggle
                            v-model="state.siteMenu"
                            :ui="{
                                active: 'bg-blue dark:bg-yellow',
                            }"
                            size="md"
                        />
                        <span>{{ label }}</span>
                    </div>
                    <div
                        v-else-if="name === 'adminMenu'"
                        class="flex gap-[10px] items-center mb-[10px]"
                    >
                        <UToggle
                            v-model="state.adminMenu"
                            :ui="{
                                active: 'bg-blue dark:bg-yellow',
                            }"
                            size="md"
                        />
                        <span>{{ label }}</span>
                    </div>
                    <USelectMenu
                        v-else-if="type === 'select'"
                        v-model="state.featuredProducts"
                        :options="titles"
                        :placeholder="placeholder"
                        :ui="{
                            wrapper: 'select-wrapper',
                        }"
                        :uiMenu="{
                            option: {
                                color: 'dark:text-[#6b7280]',
                            },
                        }"
                        multiple
                    />
                    <div
                        v-else-if="name === 'isEnabled'"
                        class="flex gap-[10px] items-center mb-[10px]"
                    >
                        <UToggle
                            v-model="state.isEnabled"
                            :ui="{
                                active: 'bg-blue dark:bg-yellow',
                            }"
                            size="md"
                        />
                        <span>{{ label }}</span>
                    </div>
                </UFormGroup>
            </div>
            <div
                class="rounded-[8px] width-[40%] basis-[40%] flex flex-col relative group md:mt-[36px] mt-[10px]"
            >
                <UiImageUpload
                    v-model:drop-zone-ref="dropZoneRef"
                    v-model:image="articleImage"
                    :add-new="true"
                    alt="New Article"
                    @change="uploadImage($event)"
                    @delete="deleteImageHandler"
                />
            </div>
        </div>
        <div class="flex justify-end">
            <UButton class="dark-button" type="submit">
                {{ locale[settingsDataStore.locale].addNewArticle }}
            </UButton>
        </div>
    </UForm>
</template>
