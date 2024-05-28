<script lang="ts" setup>
import { schema, type Schema } from "./schema/user-info.schema";
import type { FormSubmitEvent } from "#ui/types";
import { eng } from "~/lang/eng";
import { useUserDataStore } from "~/stores/user-data";
import type { UserData } from "~/types/ui/ui.types";

// define
defineProps<{ userData: UserData[] }>();

// Store
const userStore = useUserDataStore();
await userStore.getUser();
const { savedUser: user } = storeToRefs(userStore);
const isLoading = ref(false);

// Vars
const toast = useToast();
const inputRef = ref<HTMLInputElement>();
const dropZoneRef = ref<HTMLDivElement | null>();

const state = reactive({
  name: user.value?.name,
  email: user.value?.email,
  role: user.value?.role,
  oldPassword: "",
  newPassword: "",
});

// Handlers
const uploadImage = async (id: string, image: File) => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    if (user.value) {
      formData.append("id", id);
    }
    if (image) {
      formData.append("image", image);
    }
    await $fetch("/api/user/photo", {
      method: "POST",
      body: formData,
    });
    await userStore.getUser();
    toast.add({ title: "Image uploaded", color: "green" });
    isLoading.value = false;
  } catch (_error) {
    toast.add({ title: "File upload error, must be an image", color: "red" });
  }
};

const onDrop = async (files: File[] | null) => {
  if (user.value && files) {
    uploadImage(user.value._id, files[0]);
  }
};

useDropZone(dropZoneRef, { onDrop });

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

const deleteImageHandler = async () => {
  try {
    await $fetch("/api/user/photo", {
      method: "DELETE",
      body: {
        id: user.value!._id!.toString(),
      },
    });
    inputRef.value!.value = "";
    await userStore.getUser();
    toast.add({ title: "File deleted", color: "green" });
  } catch (_error) {
    toast.add({ title: "File delete error", color: "red" });
  }
};

const inputHandler = async (e: Event) => {
  let fileInput = e.target as HTMLInputElement;
  if (fileInput && user.value) {
    uploadImage(user.value._id, fileInput.files![0]);
  }
};

// hooks
onMounted(() => {
  if (inputRef.value) {
    inputRef.value.addEventListener("change", inputHandler);
  }
});

onUnmounted(() => {
  if (inputRef.value) {
    inputRef.value.removeEventListener("change", inputHandler);
  }
});
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
        class="rounded-[8px] basis-[40%] p-[20px] bg-fa-white dark:bg-[#2c2c2c] flex items-center justify-center relative group"
      >
        <input type="file" ref="inputRef" class="hidden" />
        <div
          v-if="user && !user.image"
          class="w-full h-full flex items-center justify-center flex-col text-center gap-[20px]"
          ref="dropZoneRef"
        >
          <img
            src="~/public/no-image.svg"
            alt="No Image"
            class="lg:w-[100px] w-[40px]"
          />
          <div class="flex flex-col gap-[10px] text-[14px] items-center">
            <h3>{{ eng.dragDropMessage }}</h3>
            <UDivider
              :label="eng.or"
              :ui="{
                border: {
                  base: 'dark:border-[#70706e]',
                },
                label: 'text-[12px]',
              }"
            />
            <button
              type="button"
              @click="inputRef?.click()"
              class="hover:bg-grey py-[2px] px-[10px] rounded-[8px] dark:hover:bg-gray-main"
            >
              {{ eng.clickToUpload }}
            </button>
          </div>
        </div>
        <div v-else class="w-full">
          <UiSpinner v-if="isLoading" />
          <template v-else>
            <img
              :src="`/${user?.image}`"
              class="w-full rounded-[8px] group-hover:opacity-70 transition-opacity"
              :alt="user?.name"
            />
            <UButton
              icon="i-heroicons-trash"
              @click="deleteImageHandler"
              class="absolute top-1/2 left-1/2 dark:hover:bg-yellow dark:bg-yellow h-[50px] w-[50px] flex items-center justify-center -translate-x-[50%] -translate-y-[50%] bg-blue hover:bg-blue opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </template>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <UButton type="submit" class="dark-button">
        {{ eng.update }}
      </UButton>
    </div>
  </UForm>
</template>
