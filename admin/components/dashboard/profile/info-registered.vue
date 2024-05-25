<script lang="ts" setup>
import { eng } from "~/lang/eng";

const userData = [
  {
    label: eng.userName,
    name: "name",
    placeholder: eng.userName,
    icon: "i-heroicons-user-circle-16-solid",
  },
  {
    label: eng.email,
    name: "email",
    placeholder: eng.email,
    icon: "i-heroicons-envelope",
  },
  {
    label: eng.role,
    name: "role",
    placeholder: eng.role,
    icon: "i-heroicons-shield-exclamation-20-solid",
    disabled: true,
  },
  {
    label: eng.password,
    name: "oldPassword",
    type: "password",
    placeholder: eng.password,
    icon: "i-heroicons-lock-closed",
  },
  {
    label: eng.newPassword,
    name: "newPassword",
    type: "password",
    placeholder: eng.newPassword,
    icon: "i-heroicons-lock-closed",
  },
];
</script>

<template>
  <DashboardProfileInfoRegisteredForm :userData="userData" />
</template>
