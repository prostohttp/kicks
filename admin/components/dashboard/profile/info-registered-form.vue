<script lang="ts" setup>
import { schema, type Schema } from "./schema/user-info.schema";
import type { FormSubmitEvent } from "#ui/types";
import { eng } from "~/lang/eng";
import { useUserDataStore } from "~/stores/user-data";
import type { UserData } from "~/types/ui/ui.types";
import { Constants } from "~/constants";
import * as v from "valibot";

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
    formData.append("folderName", Constants.IMG_USERS);

    if (image) {
      formData.append("image", image);
    }
    const uploadedImage = await $fetch("/api/image/add", {
      method: "POST",
      body: formData,
    });

    if (!uploadedImage) {
      toast.add({ title: eng.notImage, color: "red" });
    }

    await $fetch("/api/user/edit", {
      method: "PUT",
      body: {
        id: user.value?._id,
        image: uploadedImage,
      },
    });
    await userStore.getUser();
    toast.add({ title: eng.imageUploaded, color: "green" });
    isLoading.value = false;
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
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
    toast.add({ title: eng.somethingWentWrong, color: "red" });
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
    inputRef.value!.value = "";
    toast.add({ title: eng.imageDeleted, color: "green" });
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
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
    :schema="v.safeParser(schema)"
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
      <div class="rounded-[8px] basis-[40%] flex flex-col relative group">
        <UiImageUpload
          v-model:image="user"
          v-model:isLoading="isLoading"
          :alt="user?.name"
          v-model:input-ref="inputRef"
          v-model:drop-zone-ref="dropZoneRef"
          @delete="deleteImageHandler"
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
