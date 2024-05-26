<script lang="ts" setup>
import type { UserDto } from "~/server/dto/user.dto";
import { eng } from "~/lang/eng";

// defines
const { user } = defineProps<{
  user: UserDto;
}>();

const emit = defineEmits(["delete-person"]);
// vars
const toast = useToast();
const isOpenModal = ref(false);

// handlers
const deletePerson = () => {
  emit("delete-person", user._id);
  isOpenModal.value = false;
  toast.add({ title: eng.deletePersonSuccess });
};
</script>

<template>
  <div
    class="bg-white rounded-[16px] p-[16px] dark:bg-dark-bg dark:text-fa-white flex items-center sm:items-start sm:flex-row flex-col gap-[18px] open-sans text-dark-gray relative"
  >
    <div
      class="md:min-w-[90px] md:max-w-[90px] w-[60%] rounded-[8px] overflow-hidden p-[5px] bg-fa-white dark:bg-dark-gray flex items-center justify-center"
    >
      <template v-if="user.image">
        <img :src="`/${user.image}`" :alt="user.name" class="rounded-[8px]" />
      </template>
      <template v-else>
        <img src="~/public/no-image.svg" :alt="eng.noImage" />
      </template>
    </div>
    <div class="flex flex-col items-center sm:items-start whitespace-pre-wrap">
      <h3 class="text-[16px] leading-[20px] sm:gap-0 gap-[10px]">
        {{ user.name }}
      </h3>
      <span
        class="text-opacity-60 text-[14px] text-black dark:text-fa-white dark:opacity-40"
      >
        {{ user.email }}
      </span>
      <strong class="font-[600] sm:mt-auto mt-[15px] uppercase">
        {{ user.role }}
      </strong>
    </div>
    <div class="ml-auto sm:static absolute top-4 right-4">
      <UPopover
        :popper="{ placement: 'bottom-end', offsetDistance: 10 }"
        :ui="{
          rounded: 'rounded-[8px]',
          ring: 'ring-[#e7e7e3] ring-1',
          shadow: 'shadow-none',
          width: 'md:w-auto w-[calc(100%-10px)]',
        }"
      >
        <UButton
          trailing-icon="i-heroicons-ellipsis-horizontal-solid"
          class="bg-[#efefef] dark:bg-[#efefef] text-dark-gray hover:bg-dark-gray dark:hover:bg-dark-gray dark:hover:text-fa-white hover:text-fa-white py-1"
        />

        <template #panel="{ close }">
          <ul class="p-4 flex flex-col gap-[10px]">
            <NuxtLink :to="`/dashboard/users/${user._id}`">
              {{ eng.editProfile }}
            </NuxtLink>
            <NuxtLink @click="isOpenModal = true" class="cursor-pointer">
              {{ eng.deletePerson }}
            </NuxtLink>
            <UModal v-model="isOpenModal" prevent-close>
              <UCard
                :ui="{
                  ring: '',
                  divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                }"
              >
                <template #header>
                  <div class="flex items-center justify-between">
                    <h3
                      class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                      {{ eng.deletePerson }}
                    </h3>
                    <UButton
                      color="gray"
                      variant="ghost"
                      icon="i-heroicons-x-mark-20-solid"
                      class="-my-1"
                      @click="isOpenModal = false"
                    />
                  </div>
                </template>

                <div class="flex flex-col gap-[20px]">
                  <p class="dark:text-fa-white">{{ eng.deletePersonText }}</p>
                  <div class="flex gap-[10px] mt-auto justify-end">
                    <UButton
                      class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase"
                      @click="isOpenModal = false"
                    >
                      {{ eng.cancel }}
                    </UButton>
                    <UButton
                      @click="deletePerson"
                      class="bg-danger hover:bg-danger uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white"
                    >
                      {{ eng.deletePerson }}
                    </UButton>
                  </div>
                </div>
              </UCard>
            </UModal>
          </ul>
        </template>
      </UPopover>
    </div>
  </div>
</template>
