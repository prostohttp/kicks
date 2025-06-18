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
        v-if="isAdmin || canUpload"
        ref="inputRef"
        class="hidden"
        type="file"
        @change="$emit('change', $event)"
    />
    <div
        v-if="addNew ? !model : !model?.image"
        ref="dropZoneRef"
        class="w-full flex items-center justify-center flex-col text-center gap-[20px] p-[5px] rounded-[8px] bg-fa-white dark:bg-[#2c2c2c] dark:text-fa-white"
    >
        <NuxtImg
            alt="No Image"
            class="lg:w-[100px] w-[40px] my-[30px]"
            src="/no-image.svg"
            width="200"
        />
        <div
            v-if="isAdmin || canUpload"
            class="flex flex-col gap-[10px] text-[14px] items-center"
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
                class="hover:bg-grey py-[2px] px-[10px] rounded-[8px] mb-[30px] dark:hover:bg-gray-main"
                type="button"
                @click="inputRef?.click()"
            >
                {{ locale[settingsDataStore.locale].clickToUpload }}
            </button>
        </div>
    </div>
    <div v-else class="w-full p-[5px] rounded-[8px] relative group">
        <NuxtImg
            :alt="alt"
            :class="classForDarkMode"
            :src="`/${addNew ? model : model?.image}`"
            class="w-full rounded-[8px] group-hover:opacity-70 transition-opacity"
            fit="inside"
            placeholder
            width="800"
        />
        <UButton
            v-if="isAdmin || canUpload"
            class="absolute top-1/2 left-1/2 dark:hover:bg-yellow dark:bg-yellow h-[50px] w-[50px] flex items-center justify-center -translate-x-[50%] -translate-y-[50%] bg-blue hover:bg-blue opacity-0 group-hover:opacity-100 transition-opacity"
            icon="i-heroicons-trash"
            @click="deleteImageHandler()"
        />
    </div>
</template>
