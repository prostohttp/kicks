<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { FormSubmitEvent } from "#ui/types";
import { Constants } from "~/constants";
import * as v from "valibot";

// define
const { brandId } = defineProps<{
    brandId: string;
}>();
const emit = defineEmits(["close"]);

// store
const brandDataStore = useBrandDataStore();
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => brandDataStore.getBrandById(brandId));
const { brand } = storeToRefs(brandDataStore);

// vars
const isAdmin = checkIsAdmin();
const toast = useToast();
const isOpenDeleteModal = ref(false);
const page = Number(useRoute().query.page);
const dropZoneRef = ref<HTMLInputElement | undefined>();
const schema = v.object({
    title: v.pipe(
        v.string(locale[settingsDataStore.locale].error.required),
        v.trim(),
        v.minLength(3, locale[settingsDataStore.locale].error.stringMin3),
    ),
    description: v.string(),
});

// handlers
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
    await $fetch("/api/brand/edit", {
        method: "PUT",
        body: {
            _id: brandId,
            image: uploadedImage,
        },
    });
};

const uploadImage = async (e: Event) => {
    try {
        let fileInput = e.target as HTMLInputElement;
        const formData = new FormData();
        if (fileInput.files![0]) {
            formData.append("folderName", Constants.IMG_BRANDS);
            formData.append("image", fileInput.files![0]);
        }
        await uploadImageHandler(formData);
        brandDataStore.getBrandById(brandId);
        brandDataStore.getAllBrands(page);
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
                formData.append("folderName", Constants.IMG_BRANDS);
                formData.append("image", files![0]);
            }
            await uploadImageHandler(formData);
            brandDataStore.getBrandById(brandId);
            brandDataStore.getAllBrands(page);
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
    try {
        await $fetch("/api/brand/edit", {
            method: "PUT",
            body: {
                _id: brand.value?._id,
                title: event.data.title,
                description: event.data.description,
                image: brand.value?.image || "",
            },
        });
        brandDataStore.getBrandById(brandId);
        brandDataStore.getAllBrands(page);
        emit("close");
        toast.add({ title: locale[settingsDataStore.locale].successEdit });
    } catch (_error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
        });
    }
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const deleteImageHandler = async () => {
    try {
        await $fetch("/api/image/remove", {
            method: "DELETE",
            body: {
                image: brand.value?.image,
            },
        });
        await $fetch("/api/brand/edit", {
            method: "PUT",
            body: {
                _id: brand.value?._id,
                image: "",
            },
        });
        brandDataStore.getBrandById(brandId);
        brandDataStore.getAllBrands(page);
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

const deleteBrandHandler = async () => {
    try {
        if (brand.value?.image) {
            await $fetch("/api/image/remove", {
                method: "DELETE",
                body: {
                    image: brand.value.image,
                },
            });
        }
        await $fetch("/api/brand/remove", {
            method: "DELETE",
            body: {
                id: brand.value?._id,
            },
        });
        brandDataStore.getAllBrands(page);
        emit("close");
        toast.add({
            title: locale[settingsDataStore.locale].successDeleteMessage,
            color: "red",
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
    <LazyUiEmpty v-if="!brand" />
    <UForm
        v-else
        :schema="v.safeParser(schema)"
        :state="brand"
        class="space-y-4"
        @submit="protectedSubmitHandler"
    >
        <div
            v-if="isAdmin"
            class="rounded-[8px] basis-[40%] px-[20px] py-[40px] bg-fa-white flex items-center justify-center relative group mb-[40px]"
        >
            <UiImageUpload
                v-model:drop-zone-ref="dropZoneRef"
                v-model:image="brand"
                :alt="brand?.title"
                @change="uploadImage($event)"
                @delete="deleteImageHandler"
            />
        </div>
        <div
            v-else-if="!isAdmin && brand?.image"
            class="rounded-[8px] basis-[40%] px-[20px] py-[40px] bg-fa-white dark:bg-opacity-90 flex items-center justify-center relative group mb-[40px]"
        >
            <div class="w-full">
                <NuxtImg
                    :src="`/${brand.image}`"
                    alt="new brand"
                    class="w-full rounded-[8px] dark:brightness-0 dark:invert-[0.5]"
                    width="200"
                />
            </div>
        </div>
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
                v-model="brand.title"
                :placeholder="locale[settingsDataStore.locale].title"
                icon="i-heroicons-queue-list"
                inputClass="input-label"
            />
        </UFormGroup>

        <UFormGroup
            :label="locale[settingsDataStore.locale].description"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="description"
        >
            <UTextarea
                v-model="brand.description"
                :placeholder="locale[settingsDataStore.locale].description"
                class="textarea"
            />
        </UFormGroup>
        <div
            v-if="isAdmin"
            class="flex sm:gap-[20px] pt-[20px] justify-end sm:flex-row flex-col gap-[10px]"
        >
            <UTooltip
                :popper="{ placement: 'top' }"
                :text="locale[settingsDataStore.locale].delete"
                class="mr-auto"
            >
                <UButton
                    class="bg-danger hover:bg-danger uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white flex sm:w-auto w-full text-center justify-center"
                    icon="i-heroicons-trash"
                    @click="isOpenDeleteModal = true"
                >
                </UButton>
            </UTooltip>
            <DashboardBrandDeleteModal
                v-model="isOpenDeleteModal"
                @delete="deleteBrandHandler"
            />
            <UButton
                class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase px-[30px] flex sm:w-auto w-full text-center justify-center"
                @click="$emit('close')"
            >
                {{ locale[settingsDataStore.locale].cancel }}
            </UButton>
            <UButton
                class="red-button uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white px-[30px] flex sm:w-auto w-full text-center justify-center"
                type="submit"
            >
                {{ locale[settingsDataStore.locale].save }}
            </UButton>
        </div>
    </UForm>
</template>
