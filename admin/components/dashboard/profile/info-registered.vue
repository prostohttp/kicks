<script lang="ts" setup>
import { locale } from "~/lang/locale";

const userData = [
  {
    label: locale["en"].userName,
    name: "name",
    placeholder: locale["en"].userName,
    icon: "i-heroicons-user-circle-16-solid",
  },
  {
    label: locale["en"].email,
    name: "email",
    placeholder: locale["en"].email,
    icon: "i-heroicons-envelope",
  },
  {
    label: locale["en"].role,
    name: "role",
    placeholder: locale["en"].role,
    icon: "i-heroicons-shield-exclamation-20-solid",
    disabled: true,
  },
  {
    label: locale["en"].password,
    name: "oldPassword",
    type: "password",
    placeholder: locale["en"].password,
    icon: "i-heroicons-lock-closed",
  },
  {
    label: locale["en"].newPassword,
    name: "newPassword",
    type: "password",
    placeholder: locale["en"].newPassword,
    icon: "i-heroicons-lock-closed",
  },
];
</script>

<template>
  <DashboardProfileInfoRegisteredForm :userData="userData" />
</template>
