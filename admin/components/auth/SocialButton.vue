<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <ULink
    target="_blank"
    :title="title"
    class="rounded-[12px] flex justify-center items-center border border-dark-gray h-[64px] sm:px-[60px] px-[20px] w-[30%]"
  >
    <slot />
  </ULink>
</template>
