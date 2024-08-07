<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { Constants } from "~/constants";
import { useUserDataStore } from "~/stores/user-data";

// Store
const userStore = useUserDataStore();
const settingsDataStore = useSettingsDataStore();
await useAsyncData("user", () => userStore.getUser());
const { savedUser: user } = storeToRefs(userStore);

// Vars
const { signOut } = useAuth();
</script>

<template>
  <div>
    <UPopover
      :popper="{ placement: 'bottom-end', offsetDistance: 46 }"
      :ui="{
        rounded: 'rounded-[8px]',
        ring: 'ring-[#e7e7e3] ring-1',
        shadow: 'shadow-none',
        width: 'md:w-auto w-[calc(100%-10px)]',
      }"
    >
      <UButton
        class="uppercase md:flex justify-center items-center h-[40px] bg-transparent border border-dark-gray text-dark-gray px-[16px] hover:bg-blue hover:text-fa-white hover:border-blue rounded-[8px] dark:bg-transparent dark:border-fa-white dark:text-fa-white dark:hover:bg-yellow dark:hover:text-dark-gray dark:hover:border-yellow hidden"
        :label="user?.role"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
      <UButton
        class="flex items-center justify-center md:hidden uppercase bg-transparent border border-dark-gray text-dark-gray hover:bg-blue hover:text-fa-white hover:border-blue rounded-[8px] dark:bg-transparent dark:border-fa-white dark:text-fa-white dark:hover:bg-yellow dark:hover:text-dark-gray dark:hover:border-yellow"
        trailing-icon="i-heroicons-user"
      />
      <template #panel="{ close }">
        <div class="p-[20px] flex flex-col gap-[20px] items-start">
          <NuxtLink
            activeClass="active"
            to="/dashboard/profile"
            class="text-[20px] font-[600] hover:text-blue dark:hover:text-yellow"
            @click="close"
          >
            {{ user?.name }}
          </NuxtLink>
          <NuxtLink
            activeClass="active"
            to="/dashboard/settings"
            class="uppercase font-[Inter] flex justify-between gap-[40px] w-full items-center"
            v-if="user?.isRegistered"
            @click="close"
          >
            <span>{{ locale[settingsDataStore.locale].settings }}</span>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="scale-[1.6]"
            />
          </NuxtLink>
          <NuxtLink
            class="uppercase font-[Inter] flex justify-between w-full items-center cursor-pointer"
            @click="signOut({ callbackUrl: Constants.SITE_URL })"
          >
            <span>{{ locale[settingsDataStore.locale].logOut }}</span>
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
