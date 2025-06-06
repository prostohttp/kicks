<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { FormSubmitEvent } from "#ui/types";
import { usePersistDataStore } from "~/stores/persist-data";
import { Constants } from "~/constants";
import * as v from "valibot";

// define
const emit = defineEmits(["close"]);

// store
const brandStore = useBrandDataStore();
const settingsDataStore = useSettingsDataStore();
const persistStore = usePersistDataStore();
const { brandImage } = storeToRefs(persistStore);

// vars
const isAdmin = checkIsAdmin();
const toast = useToast();
const state = reactive({
    title: "",
    description: "",
});
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
    return uploadedImage;
};

const uploadImage = async (e: Event) => {
    try {
        let fileInput = e.target as HTMLInputElement;
        const formData = new FormData();
        if (fileInput.files![0]) {
            formData.append("folderName", Constants.IMG_BRANDS);
            formData.append("image", fileInput.files![0]);
        }
        const uploadedImage = await uploadImageHandler(formData);
        brandImage.value = uploadedImage;
        toast.add({
            title: locale[settingsDataStore.locale].imageUploaded,
            color: "green",
        });
    } catch (_error: any) {
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
                formData.append("folderName", Constants.IMG_BRANDS);
            }
            const uploadedImage = await uploadImageHandler(formData);
            brandImage.value = uploadedImage;
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
        await $fetch("/api/brand/add", {
            method: "POST",
            body: {
                title: event.data.title,
                description: event.data.description,
                image: brandImage.value || "",
            },
        });
        brandStore.getAllBrands(page);
        toast.add({
            title: locale[settingsDataStore.locale].successAddMessage,
        });
        emit("close");
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
                image: brandImage.value,
            },
        });
        brandImage.value = "";
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
        class="space-y-4"
        @submit="protectedSubmitHandler"
    >
        <div
            class="rounded-[8px] basis-[40%] px-[20px] py-[40px] bg-fa-white dark:bg-[#2c2c2c] flex items-center justify-center relative group mb-[40px]"
            v-if="isAdmin"
        >
            <UiImageUpload
                v-model:image="brandImage"
                alt="Brand Image"
                :add-new="true"
                v-model:drop-zone-ref="dropZoneRef"
                @delete="deleteImageHandler"
                @change="uploadImage($event)"
            />
        </div>
        <UFormGroup
            :label="locale[settingsDataStore.locale].title"
            name="title"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
        >
            <UInput
                :placeholder="locale[settingsDataStore.locale].title"
                v-model="state.title"
                inputClass="input-label"
                icon="i-heroicons-queue-list"
            />
        </UFormGroup>

        <UFormGroup
            :label="locale[settingsDataStore.locale].description"
            name="description"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
        >
            <UTextarea
                v-model="state.description"
                :placeholder="locale[settingsDataStore.locale].description"
                class="textarea"
            />
        </UFormGroup>
        <div
            class="flex sm:gap-[20px] pt-[20px] justify-end sm:flex-row flex-col gap-[10px]"
            v-if="isAdmin"
        >
            <UButton
                class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase px-[30px] flex sm:w-auto w-full text-center justify-center"
                @click="$emit('close')"
            >
                {{ locale[settingsDataStore.locale].cancel }}
            </UButton>
            <UButton
                type="submit"
                class="red-button uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white px-[30px] flex sm:w-auto w-full text-center justify-center"
            >
                {{ locale[settingsDataStore.locale].save }}
            </UButton>
        </div>
    </UForm>
</template>
