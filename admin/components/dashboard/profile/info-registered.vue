<script lang="ts" setup>
import { reactive } from "vue";
import { schema, type Schema } from "./schema/user-info.schema";
import type { FormSubmitEvent } from "#ui/types";
import { eng } from "~/lang/eng";
import { useUserDataStore } from "~/stores/user-data";
import { Constants } from "~/constants";

// Store
const userStore = useUserDataStore();
await userStore.getUser();
const { savedUser: user } = storeToRefs(userStore);

// Vars
const toast = useToast();
const imageIsChanged = ref(false);
const inputRef = ref<HTMLInputElement>();
const imageRef = ref<HTMLImageElement>();
const dropZoneRef = ref<HTMLDivElement | null>();

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
const onDrop = (files: File[] | null) => {
  makeImagePreview(files![0], state, imageRef.value);
  imageIsChanged.value = true;
};

useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: Constants.fileTypes.image,
});

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
    if (inputRef.value && inputRef.value.files) {
      formData.append("image", inputRef.value.files[0]);
    }

    if (!imageIsChanged.value) {
      formData.delete("image");
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
const deleteImageHandler = () => {
  imageIsChanged.value = true;
  state.image = "";
  if (imageRef.value) {
    imageRef.value.setAttribute("src", "");
  }
  if (inputRef.value) {
    inputRef.value.value = "";
  }
};

const inputHandler = (e: Event) => {
  let fileInput = e.target as HTMLInputElement;
  if (fileInput && fileInput.files) {
    let file: File | undefined = fileInput.files[0];
    makeImagePreview(file, state, imageRef.value);
    imageIsChanged.value = true;
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
        <div
          v-show="!state.image"
          class="w-full h-full flex items-center justify-center flex-col text-center gap-[20px]"
          ref="dropZoneRef"
        >
          <img
            src="~/public/no-image.svg"
            alt="No Image"
            class="lg:w-[100px] w-[40px]"
          />
          <input type="file" ref="inputRef" class="hidden" />
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
        <div v-show="state.image" class="w-full">
          <img
            ref="imageRef"
            :src="`/${user?.image}`"
            class="w-full rounded-[8px] group-hover:opacity-70 transition-opacity"
            :alt="user?.name"
          />
          <UButton
            icon="i-heroicons-trash"
            @click="deleteImageHandler"
            class="absolute top-1/2 left-1/2 dark:hover:bg-yellow dark:bg-yellow h-[50px] w-[50px] flex items-center justify-center -translate-x-[50%] -translate-y-[50%] bg-blue hover:bg-blue opacity-0 group-hover:opacity-100 transition-opacity"
          />
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
