<script lang="ts" setup>
import { locale } from "~/lang/locale";

const userData = [
    {
        label: locale[useSettingsDataStore().locale].userName,
        name: "name",
        placeholder: locale[useSettingsDataStore().locale].userName,
        icon: "i-heroicons-user-circle-16-solid",
    },
    {
        label: locale[useSettingsDataStore().locale].email,
        name: "email",
        placeholder: locale[useSettingsDataStore().locale].email,
        icon: "i-heroicons-envelope",
    },
    {
        label: locale[useSettingsDataStore().locale].role,
        name: "role",
        placeholder: locale[useSettingsDataStore().locale].role,
        icon: "i-heroicons-shield-exclamation-20-solid",
        disabled: true,
    },
    {
        label: locale[useSettingsDataStore().locale].password,
        name: "oldPassword",
        type: "password",
        placeholder: locale[useSettingsDataStore().locale].password,
        icon: "i-heroicons-lock-closed",
    },
    {
        label: locale[useSettingsDataStore().locale].newPassword,
        name: "newPassword",
        type: "password",
        placeholder: locale[useSettingsDataStore().locale].newPassword,
        icon: "i-heroicons-lock-closed",
    },
];
</script>

<template>
    <DashboardProfileInfoRegisteredForm :userData="userData" />
</template>
