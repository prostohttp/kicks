<script lang="ts" setup>
// props
defineProps<{
  to: string;
  icon?: string;
  title: string;
}>();

// vars
</script>

<template>
  <li>
    <UButton
      ariaCurrentValue="page"
      activeClass="active"
      :to="to"
      :icon="icon"
      :label="title"
      class="dark:bg-transparent dark:text-fa-white dark:hover:bg-yellow dark:hover:text-dark-gray flex items-center text-dark-gray shadow-none bg-transparent w-full rounded-[8px] px-[16px] h-[48px] uppercase hover:bg-blue hover:text-fa-white"
    />
  </li>
</template>

<style scoped>
.active {
  @apply !bg-blue hover:text-fa-white text-fa-white dark:!bg-yellow dark:!text-dark-gray;
}
</style>
