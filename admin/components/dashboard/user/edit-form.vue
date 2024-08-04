<script lang="ts" setup>
import { schema, type Schema } from "./schema/user-info.schema";
import type { FormSubmitEvent } from "#ui/types";
import { locale } from "~/lang/locale";
import { Roles } from "~/types/server/server.types";
import { Constants } from "~/constants";
import * as v from "valibot";

// define
const { userId } = defineProps<{
  userId: string;
}>();
const emit = defineEmits(["close"]);

// store
const userDataStore = useUserDataStore();
await useAsyncData("userById", () => userDataStore.getUserById(userId));
const { userById: user } = storeToRefs(userDataStore);

// vars
const isAdmin = useIsAdmin();
const route = useRoute();
const page = Number(route.query.page);
const toast = useToast();
const dropZoneRef = ref<HTMLInputElement | undefined>();
const roles = Object.values(Roles).filter((role) => role !== Roles.ADMIN);

// handlers
const uploadImageHandler = async (formData: FormData) => {
  const uploadedImage = await $fetch("/api/image/add", {
    method: "POST",
    body: formData,
  });
  if (!uploadedImage) {
    toast.add({ title: locale["en"].noImage, color: "red" });
  }
  await $fetch("/api/user/edit", {
    method: "PUT",
    body: {
      id: userId,
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
    await userDataStore.getUserById(userId);
    await userDataStore.getAllUsers(page);
    toast.add({ title: locale["en"].imageUploaded, color: "green" });
  } catch (_error) {
    toast.add({ title: locale["en"].somethingWentWrong, color: "red" });
  }
};

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
    await userDataStore.getAllUsers(page);
    await userDataStore.getUserById(userId);
    toast.add({ title: locale["en"].imageDeleted, color: "green" });
  } catch (_error) {
    toast.add({ title: locale["en"].somethingWentWrong, color: "red" });
  }
};

const onDrop = async (files: File[] | null) => {
  try {
    if (files) {
      const formData = new FormData();
      if (files![0]) {
        formData.append("folderName", Constants.IMG_USERS);
        formData.append("image", files![0]);
      }
      await uploadImageHandler(formData);
      await userDataStore.getAllUsers(page);
      await userDataStore.getUserById(userId);
      toast.add({ title: locale["en"].imageDeleted, color: "green" });
    }
  } catch (error) {
    toast.add({ title: locale["en"].somethingWentWrong, color: "red" });
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
        role: event.data.role,
      },
    });

    await userDataStore.getAllUsers(page);
    await userDataStore.getUserById(userId);
    toast.add({
      title: "Profile updated",
      color: "green",
    });
    emit("close");
  } catch (error: any) {
    toast.add({ title: locale["en"].somethingWentWrong, color: "red" });
  }
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
  <LazyUiEmpty v-if="!user" />
  <UForm
    :schema="v.safeParser(schema)"
    :state="user"
    @submit="protectedSubmitHandler"
    class="w-full flex flex-col gap-[20px]"
    v-else
  >
    <div
      class="rounded-[8px] basis-[40%] p-[5px] bg-fa-white dark:bg-[#2c2c2c] flex items-center justify-center relative group"
    >
      <UiImageUpload
        v-model:image="user"
        :alt="user?.name"
        v-model:drop-zone-ref="dropZoneRef"
        @delete="deleteImageHandler"
        @change="uploadImage($event)"
      />
    </div>
    <UFormGroup
      :label="locale['en'].userName"
      name="name"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        :placeholder="locale['en'].userName"
        icon="i-heroicons-user-circle-16-solid"
        v-model="user.name"
        inputClass="input-label"
      />
    </UFormGroup>
    <UFormGroup
      :label="locale['en'].email"
      name="email"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        :placeholder="locale['en'].email"
        icon="i-heroicons-envelope"
        v-model="user.email"
        inputClass="input-label"
      />
    </UFormGroup>
    <UFormGroup
      :label="locale['en'].role"
      name="role"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <USelectMenu
        v-model="user.role"
        :options="roles"
        leadingIcon="i-heroicons-shield-exclamation-20-solid"
        leading
        selectClass="select-label"
      />
    </UFormGroup>
    <UButton type="submit" class="dark-button mt-[20px]">
      {{ locale["en"].update }}
    </UButton>
  </UForm>
</template>
