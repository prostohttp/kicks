<script lang="ts" setup>
import type { UserDto } from "~/server/dto/user.dto";

// define
const { user } = defineProps<{
  user: UserDto | null;
}>();

// vars
const tempUser = [
  {
    label: "Username",
    placeholder: user?.name,
    icon: "i-heroicons-user-circle-16-solid",
  },
  {
    label: "Email",
    placeholder: user?.email,
    icon: "i-heroicons-envelope",
  },
  {
    label: "Role",
    placeholder: user?.role,
    icon: "i-heroicons-shield-exclamation-20-solid",
  },
];
</script>

<template>
  <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
    <template v-if="user?.isRegistered">
      <pre>{{ user }}</pre>
    </template>
    <template v-else>
      <div class="basis-[60%] flex flex-col gap-[24px]">
        <UFormGroup
          v-for="item in tempUser"
          :label="item.label"
          :ui="{
            label: {
              base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
            },
          }"
        >
          <UInput
            :placeholder="item.placeholder"
            :icon="item.icon"
            inputClass="input-label"
            disabled
          />
        </UFormGroup>
      </div>
      <div
        class="rounded-[8px] basis-[40%] p-[8px] bg-fa-white dark:bg-[#2c2c2c] flex items-center justify-center"
      >
        <img
          src="~/public/no-image.svg"
          alt="No Image"
          v-if="!user?.image"
          class="w-[100px]"
        />
        <img
          :src="user?.image"
          :alt="user?.name"
          class="w-full rounded-[8px]"
          v-else
        />
      </div>
    </template>
  </div>
</template>
