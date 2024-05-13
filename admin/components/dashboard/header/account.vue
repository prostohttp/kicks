<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { UserDto } from "~/server/dto/user.dto";
import { Constants } from "~/constants";

// Vars
const { signOut, data } = useAuth();

const authUser = data.value?.user as UserDto;

if (!authUser) {
  throw createError({ statusMessage: "Access Denied", statusCode: 403 });
}

const user: Ref<UserDto | null | undefined> = ref();

if (authUser.isRegistered === true) {
  const { data } = await useFetch<UserDto>("/api/user/one", {
    method: "GET",
    params: {
      email: authUser.email,
    },
  });
  user.value = data.value;
} else {
  user.value = authUser;
}
</script>

<template>
  <div>
    <UPopover
      :popper="{ placement: 'bottom-end', offsetDistance: 46 }"
      :ui="{
        rounded: 'rounded-[8px]',
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
      <template #panel>
        <div class="p-[20px] flex flex-col gap-[20px] items-start">
          <NuxtLink
            to="/dashboard/profile"
            class="text-[20px] font-[600] hover:text-dark-gray dark:hover:text-fa-white"
          >
            {{ user?.name }}
          </NuxtLink>
          <NuxtLink
            activeClass="active"
            to="/dashboard/profile"
            class="uppercase font-[Inter] flex justify-between gap-[40px] w-full items-center"
            v-if="authUser?.isRegistered"
          >
            <span>{{ eng.changePassword }}</span>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="scale-[1.6]"
            />
          </NuxtLink>
          <NuxtLink
            class="uppercase font-[Inter] flex justify-between w-full items-center cursor-pointer"
            @click="signOut({ callbackUrl: Constants.SITE_URL })"
          >
            <span>{{ eng.logOut }}</span>
            <UIcon
              name="i-heroicons-arrow-right-end-on-rectangle-20-solid"
              class="scale-[1.3]"
            />
          </NuxtLink>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style scoped>
.active {
  @apply text-dark-gray dark:text-fa-white hover:text-blue dark:hover:text-yellow;
}
div[data-headlessui-state="open"] button {
  @apply bg-blue text-fa-white border-blue dark:bg-yellow dark:text-dark-gray dark:border-yellow;
}
</style>
