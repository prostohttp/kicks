<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { DropdownItem } from "#ui/types";
import type { UserDto } from "~/server/dto/user.dto";

// Vars
const { signOut, data } = useAuth();

if (!data.value) {
  throw createError({ statusMessage: "Access Denied", statusCode: 403 });
}

const { data: user } = await useFetch<UserDto>("/api/user/one", {
  method: "GET",
  params: {
    email: data.value.user?.email,
  },
});

if (!user.value) {
  throw createError({ statusMessage: "Access Denied", statusCode: 403 });
}

const items: DropdownItem[][] = [
  [
    {
      label: user.value.name,
      to: "/dashboard/profile",
      class:
        "text-[20px] font-[600] hover:text-dark-gray dark:hover:text-fa-white",
    },
    {
      label: eng.changePassword,
      to: "/dashboard/profile",
      class: "uppercase font-[Inter] flex flex-row-reverse justify-between ",
      icon: "i-heroicons-chevron-right-16-solid scale-[1.6]",
    },
    {
      label: eng.logOut,
      to: "/dashboard/profile",
      class: "uppercase font-[Inter] flex flex-row-reverse justify-between",
      icon: "i-heroicons-arrow-right-end-on-rectangle-16-solid scale-[1.4]",
      click: () => signOut({ callbackUrl: "/login" }),
    },
  ],
];
</script>

<template>
  <div>
    <UDropdown
      :items="items"
      :popper="{ placement: 'bottom-end', offsetDistance: 46 }"
      :ui="{
        rounded: 'rounded-[8px]',
        item: {
          base: 'my-[8px] hover:bg-transparent dark:hover:bg-transparent',
          icon: 'bg-dark-gray',
          active: 'bg-transparent dark:bg-transparent',
        },
        padding: 'px-[16px] py-[8px]',
        ring: 'ring-[#e7e7e3] ring-1',
        shadow: 'shadow-none',
        width: 'w-auto',
      }"
    >
      <UButton
        class="uppercase flex justify-center items-center h-[40px] bg-transparent border border-dark-gray text-dark-gray px-[16px] hover:bg-blue hover:text-fa-white hover:border-blue rounded-[8px] dark:bg-transparent dark:border-yellow dark:text-yellow dark:hover:bg-yellow dark:hover:text-dark-gray"
        :label="user?.role"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </div>
</template>

<style scoped>
div[data-headlessui-state="open"] button {
  @apply bg-blue text-fa-white border-blue dark:bg-yellow dark:text-dark-gray dark:border-yellow;
}
</style>
