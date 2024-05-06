<script lang="ts" setup></script>

<template>
  <div
    class="flex flex-col lg:pt-[80px] pt-[40px] lg:px-0 px-[10px] items-center lg:bg-[url('~/assets/img/auth-bg.jpg')] bg-none bg-bottom bg-cover lg:bg-[#dcdee5]"
  >
    <ULink :to="{ name: 'index' }">
      <img
        src="~/assets/img/small-logo.svg"
        alt="kicks"
        class="w-[248px] dark:invert-[1] lg:dark:invert-0"
      />
    </ULink>
  </div>
</template>
