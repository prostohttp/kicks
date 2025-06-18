<script lang="ts" setup>
// define
const images = defineModel("images", {
    required: true,
});
const emit = defineEmits(["delete", "change"]);

// vars
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const isAdmin = checkIsAdmin();

// handlers
const onClickHandler = () => {
    if (isAdmin) {
        inputRef.value?.click();
        inputRef.value!.value = "";
    }
};

const changeHandler = (e: Event) => {
    emit("change", e);
    // FIXME: Не нравится вариант
    setTimeout(() => {
        inputRef.value!.value = "";
    }, 1000);
};
</script>

<template>
    <input
        v-if="isAdmin"
        ref="inputRef"
        class="hidden"
        multiple
        type="file"
        @change="changeHandler($event)"
    />
    <div class="flex flex-wrap gap-[15px]">
        <div
            class="flex justify-center items-center rounded-[8px] aspect-square w-[100px] max-w-[29%] cursor-pointer bg-[#fafafa] dark:bg-[#2c2c2c]"
            @click="onClickHandler"
        >
            <UIcon
                class="w-6 h-6 opacity-70"
                name="i-material-symbols-add-to-photos"
            />
        </div>
        <div
            v-for="(image, index) in images"
            class="flex justify-center items-center rounded-[8px] aspect-square w-[100px] max-w-[29%] relative group overflow-hidden bg-[#fafafa] dark:bg-[#2c2c2c] p-[10px]"
        >
            <NuxtImg
                :src="`/${image}`"
                class="rounded-[8px] group-hover:opacity-70 transition-opacity"
            />
            <UButton
                v-if="isAdmin"
                class="absolute top-1/2 left-1/2 dark:hover:bg-yellow dark:bg-yellow h-[30px] w-[30px] flex items-center justify-center -translate-x-[50%] -translate-y-[50%] bg-blue hover:bg-blue opacity-0 group-hover:opacity-100 transition-opacity"
                icon="i-heroicons-trash"
                @click="emit('delete', index)"
            />
        </div>
    </div>
</template>
