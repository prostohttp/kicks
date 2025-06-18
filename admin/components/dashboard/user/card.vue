<script lang="ts" setup>
import type { UserDto } from "~/server/dto/user.dto";
import { locale } from "~/lang/locale";
import { DashboardUserEditModal, DashboardUserDeleteModal } from "#components";
import { addQuery } from "~/utils/add-query";

// define
const emit = defineEmits(["delete-person"]);
const { user } = defineProps<{
    user: UserDto;
}>();

// store
const settingsDataStore = useSettingsDataStore();

// vars
const route = useRoute();
const toast = useToast();
const modal = useModal();

// handlers
const openEditUserModal = (userId: string) => {
    modal.open(DashboardUserEditModal, {
        userId,
        onClose() {
            removeQuery("userEdit");
            modal.close();
        },
    });
};

const openDeleteUserModal = () => {
    modal.open(DashboardUserDeleteModal, {
        onClose() {
            modal.close();
        },
        onDelete() {
            emit("delete-person", user._id);
            modal.close();
            toast.add({
                title: locale[settingsDataStore.locale].deletePersonSuccess,
            });
        },
    });
};

// hooks
onMounted(() => {
    if (route.query.userEdit) {
        openEditUserModal(route.query.userEdit.toString());
    }
});
</script>

<template>
    <div
        class="bg-white rounded-[16px] p-[16px] dark:bg-dark-bg dark:text-fa-white flex items-center sm:items-start sm:flex-row flex-col gap-[18px] open-sans text-dark-gray relative"
    >
        <div
            class="sm:min-w-[90px] sm:max-w-[90px] w-[60%] rounded-[8px] overflow-hidden p-[15px] bg-fa-white dark:bg-dark-gray flex items-center justify-center aspect-square"
        >
            <template v-if="user.image">
                <NuxtImg
                    :alt="user.name"
                    :src="`/${user.image}`"
                    class="rounded-[8px]"
                    fit="inside"
                    placeholder
                    width="80"
                />
            </template>
            <template v-else>
                <NuxtImg
                    :alt="locale[settingsDataStore.locale].noImage"
                    src="/no-image.svg"
                    width="40"
                />
            </template>
        </div>
        <div class="flex flex-col items-center sm:items-start break-all">
            <h3 class="text-[16px] leading-[20px] sm:gap-0 gap-[10px] mb-[5px]">
                {{ user.name }}
            </h3>
            <span
                class="text-opacity-60 text-[14px] text-black dark:text-fa-white dark:opacity-40 mb-[10px]"
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
                    width: 'md:w-auto w-[calc(100%-20px)]',
                    position: 'right-[10px] sm:right-auto',
                }"
            >
                <UButton
                    class="bg-[#efefef] dark:bg-[#efefef] text-dark-gray hover:bg-dark-gray dark:hover:bg-dark-gray dark:hover:text-fa-white hover:text-fa-white py-[2.5px]"
                    trailing-icon="i-heroicons-ellipsis-horizontal-solid"
                />

                <template #panel>
                    <ul class="p-4 flex flex-col gap-[10px]">
                        <NuxtLink
                            :to="addQuery('userEdit', user._id)"
                            active-class="active"
                            class="cursor-pointer"
                            @click="openEditUserModal(user._id)"
                        >
                            {{ locale[settingsDataStore.locale].editProfile }}
                        </NuxtLink>

                        <NuxtLink
                            class="cursor-pointer"
                            @click="openDeleteUserModal"
                        >
                            {{ locale[settingsDataStore.locale].deletePerson }}
                        </NuxtLink>
                    </ul>
                </template>
            </UPopover>
        </div>
    </div>
</template>

<style scoped>
.active {
    @apply dark:text-fa-white dark:hover:text-yellow text-dark-gray hover:text-blue;
}
</style>
