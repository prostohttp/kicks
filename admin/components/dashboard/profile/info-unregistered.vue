<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { UserDto } from "~/server/dto/user.dto";

// define
const { data } = useAuth();
const user = data.value?.user as UserDto;
// vars
const tempUser = [
    {
        label: locale[useSettingsDataStore().locale].userName,
        placeholder: user.name,
        icon: "i-heroicons-user-circle-16-solid",
    },
    {
        label: locale[useSettingsDataStore().locale].email,
        placeholder: user.email,
        icon: "i-heroicons-envelope",
    },
    {
        label: locale[useSettingsDataStore().locale].role,
        placeholder: user.role,
        icon: "i-heroicons-shield-exclamation-20-solid",
    },
];
</script>

<template>
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
            src="/no-image.svg"
            alt="No Image"
            v-if="!user?.image"
            class="w-[100px]"
        />
        <img :src="user?.image" class="w-full rounded-[8px]" v-else />
    </div>
</template>
