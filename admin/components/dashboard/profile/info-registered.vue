<script lang="ts" setup>
import { reactive } from "vue";
import { schema, type Schema } from "./schema/user-info.schema";
import type { FormSubmitEvent } from "#ui/types";
import { eng } from "~/lang/eng";
import { useUserDataStore } from "~/stores/user-data";

// Store
const userStore = useUserDataStore();
await useAsyncData("user", () => userStore.getUser());
const { savedUser: user } = storeToRefs(userStore);

// Vars
const toast = useToast();
const state = reactive({
  name: user.value?.name,
  email: user.value?.email,
  image: user.value?.image,
  role: user.value?.role,
  oldPassword: "",
  newPassword: "",
});

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

// Handlers
const onSubmitHandler = async (event: FormSubmitEvent<Schema>) => {
  try {
    const formData = new FormData();

    formData.append("id", user.value!._id!.toString());
    formData.append("name", event.data.name);
    formData.append("email", event.data.email);
    if (event.data.oldPassword) {
      formData.append("oldPassword", event.data.oldPassword);
    }
    if (event.data.newPassword) {
      formData.append("newPassword", event.data.newPassword);
    }

    await $fetch("/api/user/edit", {
      method: "PUT",
      body: formData,
    });

    await userStore.getUser();

    toast.add({
      title: "Profile updated",
      color: "green",
    });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};
const onSubmit = useThrottleFn(onSubmitHandler, 3000);
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    @submit="onSubmit"
    class="w-full flex flex-col gap-[50px]"
  >
    <div class="flex gap-[30px] lg:flex-row flex-col-reverse">
      <div class="basis-[60%] flex flex-col gap-[24px]">
        <UFormGroup
          v-for="{ name, label, placeholder, icon, type, disabled } in userData"
          :label="label"
          :name="name"
          :ui="{
            label: {
              base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
            },
          }"
        >
          <UInput
            :placeholder="placeholder"
            :icon="icon"
            v-model="state[name as keyof typeof state]"
            inputClass="input-label"
            :type="type ? type : 'text'"
            :disabled="disabled"
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
          :src="`/${user.image}`"
          class="w-full rounded-[8px]"
          :alt="user.name"
          v-else
        />
      </div>
    </div>
    <div class="flex justify-end">
      <UButton type="submit" class="dark-button">
        {{ eng.update }}
      </UButton>
    </div>
  </UForm>
</template>
