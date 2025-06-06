<script lang="ts" setup>
import { locale } from "~/lang/locale";

interface IImageModel {
    image: string;
    name?: string;
    title?: string;
    classForDarkMode?: string;
}

// store
const settingsDataStore = useSettingsDataStore();

// define
const { alt, addNew, canUpload, classForDarkMode } = defineProps<{
    alt: string | undefined;
    addNew?: boolean;
    canUpload?: boolean;
    classForDarkMode?: string;
}>();
const model: Ref<IImageModel | undefined> = defineModel("image");

const dropZoneRef: Ref<HTMLDivElement | undefined> = defineModel("dropZoneRef");
const emit = defineEmits(["delete", "change"]);

// vars
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const isAdmin = checkIsAdmin();

// handlers
const deleteImageHandler = () => {
    inputRef.value!.value = "";
    emit("delete");
};
</script>

<template>
    <input
        type="file"
        @change="$emit('change', $event)"
        ref="inputRef"
        class="hidden"
        v-if="isAdmin || canUpload"
    />
    <div
        v-if="addNew ? !model : !model?.image"
        class="w-full flex items-center justify-center flex-col text-center gap-[20px] p-[5px] rounded-[8px] bg-fa-white dark:bg-[#2c2c2c] dark:text-fa-white"
        ref="dropZoneRef"
    >
        <NuxtImg
            src="/no-image.svg"
            width="200"
            alt="No Image"
            class="lg:w-[100px] w-[40px] my-[30px]"
        />
        <div
            class="flex flex-col gap-[10px] text-[14px] items-center"
            v-if="isAdmin || canUpload"
        >
            <h3>{{ locale[settingsDataStore.locale].dragDropMessage }}</h3>
            <UDivider
                :label="locale[settingsDataStore.locale].or"
                :ui="{
                    border: {
                        base: 'dark:border-[#70706e]',
                    },
                    label: 'text-[12px]',
                }"
            />
            <button
                type="button"
                @click="inputRef?.click()"
                class="hover:bg-grey py-[2px] px-[10px] rounded-[8px] mb-[30px] dark:hover:bg-gray-main"
            >
                {{ locale[settingsDataStore.locale].clickToUpload }}
            </button>
        </div>
    </div>
    <div class="w-full p-[5px] rounded-[8px] relative group" v-else>
        <NuxtImg
            :src="`/${addNew ? model : model?.image}`"
            placeholder
            fit="inside"
            width="800"
            :class="classForDarkMode"
            class="w-full rounded-[8px] group-hover:opacity-70 transition-opacity"
            :alt="alt"
        />
        <UButton
            icon="i-heroicons-trash"
            @click="deleteImageHandler()"
            class="absolute top-1/2 left-1/2 dark:hover:bg-yellow dark:bg-yellow h-[50px] w-[50px] flex items-center justify-center -translate-x-[50%] -translate-y-[50%] bg-blue hover:bg-blue opacity-0 group-hover:opacity-100 transition-opacity"
            v-if="isAdmin || canUpload"
        />
    </div>
</template>
