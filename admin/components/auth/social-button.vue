<script lang="ts" setup>
// props
defineProps<{
    title: string;
}>();
</script>

<template>
    <ULink
        :title="title"
        class="rounded-[12px] flex justify-center items-center border border-dark-gray h-[64px] sm:px-[60px] px-[20px] w-[30%] dark:border-white dark:bg-white"
        target="_blank"
    >
        <slot />
    </ULink>
</template>
