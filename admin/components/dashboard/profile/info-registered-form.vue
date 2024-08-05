<script lang="ts" setup>
import { schema, type Schema } from "./schema/user-info.schema";
import type { FormSubmitEvent } from "#ui/types";
import { locale } from "~/lang/locale";
import { useUserDataStore } from "~/stores/user-data";
import type { UserData } from "~/types/ui/ui.types";
import { Constants } from "~/constants";
import * as v from "valibot";

// define
defineProps<{ userData: UserData[] }>();

// Store
const userStore = useUserDataStore();
await useAsyncData("savedUser", () => userStore.getUser());
const { savedUser: user } = storeToRefs(userStore);

// Vars
const isAdmin = useIsAdmin();
const toast = useToast();
const dropZoneRef = ref<HTMLInputElement | undefined>();

const state = reactive({
  name: user.value?.name,
  email: user.value?.email,
  role: user.value?.role,
  oldPassword: "",
  newPassword: "",
});

// Handlers
const uploadImageHandler = async (formData: FormData) => {
  const uploadedImage = await $fetch("/api/image/add", {
    method: "POST",
    body: formData,
  });
  if (!uploadedImage) {
    toast.add({
      title: locale[useSettingsDataStore().locale].noImage,
      color: "red",
    });
  }
  await $fetch("/api/user/edit", {
    method: "PUT",
    body: {
      id: user.value?._id,
      image: uploadedImage,
    },
  });
};

const uploadImage = async (e: Event) => {
  try {
    let fileInput = e.target as HTMLInputElement;
    const formData = new FormData();
    if (fileInput.files![0]) {
      formData.append("folderName", Constants.IMG_USERS);
      formData.append("image", fileInput.files![0]);
    }
    await uploadImageHandler(formData);
    await userStore.getUser();
    toast.add({
      title: locale[useSettingsDataStore().locale].imageUploaded,
      color: "green",
    });
  } catch (_error) {
    toast.add({
      title: locale[useSettingsDataStore().locale].somethingWentWrong,
      color: "red",
    });
  }
};

const onDrop = async (files: File[] | null) => {
  if (user.value && files) {
    try {
      const formData = new FormData();
      if (files![0]) {
        formData.append("image", files![0]);
        formData.append("folderName", Constants.IMG_USERS);
      }
      await uploadImageHandler(formData);
      await userStore.getUser();
      toast.add({
        title: locale[useSettingsDataStore().locale].imageUploaded,
        color: "green",
      });
    } catch (error) {
      toast.add({
        title: locale[useSettingsDataStore().locale].somethingWentWrong,
        color: "red",
      });
    }
  }
};

useDropZone(dropZoneRef, { onDrop });

const onSubmitHandler = async (event: FormSubmitEvent<Schema>) => {
  try {
    await $fetch("/api/user/edit", {
      method: "PUT",
      body: {
        id: user.value?._id,
        name: event.data.name,
        email: event.data.email,
        oldPassword: event.data.oldPassword,
        newPassword: event.data.newPassword,
      },
    });

    await userStore.getUser();

    toast.add({
      title: "Profile updated",
      color: "green",
    });
  } catch (error: any) {
    toast.add({
      title: locale[useSettingsDataStore().locale].somethingWentWrong,
      color: "red",
    });
  }
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const deleteImageHandler = async () => {
  try {
    await $fetch("/api/image/remove", {
      method: "DELETE",
      body: {
        image: user.value?.image,
      },
    });
    await $fetch("/api/user/edit", {
      method: "PUT",
      body: {
        id: user.value?._id,
        image: "",
      },
    });
    await userStore.getUser();
    toast.add({
      title: locale[useSettingsDataStore().locale].imageDeleted,
      color: "green",
    });
  } catch (_error) {
    toast.add({
      title: locale[useSettingsDataStore().locale].somethingWentWrong,
      color: "red",
    });
  }
};

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
  <UForm
    :schema="v.safeParser(schema)"
    :state="state"
    @submit="protectedSubmitHandler"
    class="w-full flex flex-col gap-[50px]"
  >
    <div class="flex gap-[30px] lg:flex-row flex-col-reverse">
      <div class="basis-[60%] flex flex-col gap-[24px]">
        <UFormGroup
          v-for="{ name, label, placeholder, icon, type, disabled } in userData"
          :label="label"
          :name="name"
          :key="name"
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
      <div class="rounded-[8px] basis-[40%] flex flex-col relative group">
        <UiImageUpload
          v-model:image="user"
          :alt="user?.name"
          v-model:drop-zone-ref="dropZoneRef"
          @delete="deleteImageHandler"
          @change="uploadImage($event)"
        />
      </div>
    </div>
    <div class="flex justify-end">
      <UButton type="submit" class="dark-button">
        {{ locale[useSettingsDataStore().locale].update }}
      </UButton>
    </div>
  </UForm>
</template>
