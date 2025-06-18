<script lang="ts" setup>
import type { ModelRef } from "vue";
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { OptionDtoWithValues } from "~/server/api/option/dto/option.dto";

// define
const state: ModelRef<OptionDtoWithValues | undefined> = defineModel("state");

// store
const settingsDataStore = useSettingsDataStore();
const optionDataStore = useOptionDataStore();

// vars
const toast = useToast();
const columns = [
    {
        key: "value",
        label: locale[settingsDataStore.locale].value,
    },
    {
        key: "image",
        label: locale[settingsDataStore.locale].image,
    },
    {
        key: "sort",
        label: locale[settingsDataStore.locale].sort,
    },
    {
        key: "action",
    },
];

// handlers
const uploadImage = async (e: Event, id: string) => {
    try {
        let fileInput = e.target as HTMLInputElement;
        const formData = new FormData();
        formData.append("folderName", Constants.IMG_OPTIONS);
        if (fileInput.files![0]) {
            formData.append("image", fileInput.files![0]);
        }
        const uploadedImage = await $fetch("/api/image/add", {
            method: "POST",
            body: formData,
        });

        changeValueFromArray(id, state.value?.values!, "image", uploadedImage);

        if (!uploadedImage) {
            toast.add({
                title: locale[settingsDataStore.locale].notImage,
                color: "red",
            });
        }
        toast.add({
            title: locale[settingsDataStore.locale].imageUploaded,
            color: "green",
        });
    } catch (error: any) {
        toast.add({ title: error.message, color: "red" });
    }
};

const deleteImageHandler = async (id: string) => {
    try {
        await $fetch("/api/image/remove", {
            method: "DELETE",
            body: {
                image: state.value?.values!.filter(
                    (value) => value._id === id,
                )[0].image,
            },
        });
        changeValueFromArray(id, state.value?.values!, "image", "");
        toast.add({
            title: locale[settingsDataStore.locale].imageDeleted,
            color: "green",
        });
    } catch (error: any) {
        toast.add({ title: error.message, color: "red" });
    }
};

const deleteValue = (id: string) => {
    const array = state.value?.values!;
    const index = array.findIndex((value) => value._id === id);
    if (index !== -1) {
        array.splice(index, 1);
    }
};
</script>

<template>
    <UTable
        :columns="columns"
        :empty-state="{
            icon: '',
            label: '',
        }"
        :rows="state?.values"
        :ui="{
            td: {
                base: 'md:whitespace-pre-wrap md:break-all whitespace-normal break-normal for-absolute',
            },
            emptyState: {
                wrapper: 'hidden',
            },
        }"
    >
        <template #caption>
            <caption
                class="pb-[15px] w-full justify-between items-center text-left text-[20px] dark:text-fa-white font-[Rubik] font-[500] relative mt-[20px]"
            >
                <span>
                    {{ locale[settingsDataStore.locale].addValue }}
                </span>
            </caption>
        </template>
        <template #value-data="{ row }">
            <UFormGroup :name="`value${row._id}`">
                <UInput
                    v-model="row.value.label"
                    :placeholder="locale[settingsDataStore.locale].addValue"
                    inputClass="clean-field"
                />
            </UFormGroup>
        </template>
        <template #image-data="{ row }">
            <UiImageUploadSmall
                v-model="row.image"
                @change="uploadImage($event, row._id)"
                @delete="deleteImageHandler(row._id)"
            />
        </template>
        <template #sort-data="{ row }">
            <UFormGroup :name="`sort${row._id}`">
                <UInput
                    v-model="row.sort"
                    :placeholder="locale[settingsDataStore.locale].sort"
                    inputClass="clean-field"
                    min="1"
                    type="number"
                />
            </UFormGroup>
        </template>
        <template #action-data="{ row }">
            <UButton
                class="icon-button float-right"
                icon="i-heroicons-minus-circle-16-solid"
                @click="deleteValue(row._id)"
            />
        </template>
    </UTable>
    <UButton
        class="icon-button float-right mr-[15px]"
        icon="i-heroicons-plus-circle-16-solid"
        type="button"
        @click="optionDataStore.addNewOptionValueToTable(state?.values)"
    />
</template>
