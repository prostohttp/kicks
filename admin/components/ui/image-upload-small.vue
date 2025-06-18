<script lang="ts" setup>
// define
const model: Ref<string | undefined> = defineModel();
const emit = defineEmits(["delete", "change"]);

// vars
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const isAdmin = checkIsAdmin();

// handlers
const onClickHandler = () => {
    inputRef.value?.click();
};

const deleteImageHandler = () => {
    inputRef.value!.value = "";
    emit("delete");
};
</script>

<template>
    <input
        v-if="isAdmin"
        ref="inputRef"
        class="hidden"
        type="file"
        @change="$emit('change', $event)"
    />
    <UPopover :popper="{ placement: 'bottom-start' }">
        <div v-if="!model" class="cursor-pointer">
            <NuxtImg
                alt="No Image"
                class="lg:w-[40px] w-[40px]"
                src="/no-image.svg"
                width="40"
            />
        </div>
        <div v-else class="w-full rounded-[8px] relative">
            <NuxtImg
                :src="`/${model}`"
                class="lg:w-[40px] w-[40px] rounded-[8px] group-hover:opacity-70 transition-opacity"
                width="60"
            />
        </div>
        <template #panel>
            <div
                v-if="isAdmin"
                class="flex gap-[5px] items-center py-[1px] px-[5px]"
            >
                <UButton
                    v-if="!model"
                    class="icon-button float-right"
                    icon="i-heroicons-inbox-arrow-down-solid"
                    @click="onClickHandler"
                />
                <UButton
                    v-else
                    class="icon-button float-right"
                    icon="i-heroicons-archive-box-x-mark-solid"
                    @click="deleteImageHandler"
                />
            </div>
        </template>
    </UPopover>
</template>
