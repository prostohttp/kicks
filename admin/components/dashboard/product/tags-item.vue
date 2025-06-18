<script lang="ts" setup>
// define
const { tag, index } = defineProps<{
    tag: string;
    index: number;
}>();

const emit = defineEmits(["delete"]);
</script>

<template>
    <div
        class="pl-[10px] pr-[7px] py-[5px] flex items-center justify-center gap-[5px] rounded-[4px] bg-dark-gray dark:bg-fa-white dark:text-dark-gray text-fa-white"
    >
        <span class="text-[13px]">
            {{ tag }}
        </span>
        <UIcon
            class="cursor-pointer"
            name="i-material-symbols-close-rounded"
            @click="emit('delete', index)"
        />
    </div>
</template>
