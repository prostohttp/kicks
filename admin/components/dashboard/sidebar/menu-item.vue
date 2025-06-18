<script lang="ts" setup>
// props
defineProps<{
    to: string;
    icon: string;
    title: string;
    protected?: boolean;
}>();

// vars
</script>

<template>
    <li v-if="!protected">
        <NuxtLink
            :to="to"
            activeClass="active"
            class="dark:bg-transparent dark:text-fa-white dark:hover:bg-yellow dark:hover:text-dark-gray flex items-center gap-[8px] text-dark-gray shadow-none bg-transparent w-full rounded-[8px] px-[16px] h-[48px] uppercase hover:bg-blue hover:text-fa-white font-[600]"
        >
            <UIcon :name="icon" class="scale-[1.1]" />
            <span>{{ title }}</span>
        </NuxtLink>
    </li>
</template>

<style scoped>
.active {
    @apply bg-blue hover:text-fa-white text-fa-white dark:bg-yellow dark:text-dark-gray;
}
</style>
