<script lang="ts" setup>
import { schema, type Schema } from "./schema/user-info.schema";
import type { FormSubmitEvent } from "#ui/types";
import { eng } from "~/lang/eng";
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
const isLoading = ref(false);
const page = Number(useRoute().query.page);
const toast = useToast();
const inputRef = ref<HTMLInputElement | undefined>();
const dropZoneRef = ref<HTMLDivElement | undefined>();
const roles = Object.values(Roles).filter((role) => role !== Roles.ADMIN);

// handlers
const uploadImage = async (image: File) => {
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
    await userDataStore.getUserById(userId);
    await userDataStore.getAllUsers(page);
    toast.add({ title: eng.imageUploaded, color: "green" });
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
  isLoading.value = false;
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
    inputRef.value!.value = "";
    toast.add({ title: eng.imageDeleted, color: "green" });
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};

const onDrop = (files: File[] | null) => {
  if (files && user.value) {
    uploadImage(files[0]);
  }
};

useDropZone(dropZoneRef, { onDrop });

const inputHandler = (e: Event) => {
  let fileInput = e.target as HTMLInputElement;
  if (user.value) {
    uploadImage(fileInput.files![0]);
  }
};

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
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

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

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
  <UiEmpty v-if="!user" />
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
        v-model:isLoading="isLoading"
        :alt="user?.name"
        v-model:input-ref="inputRef"
        v-model:drop-zone-ref="dropZoneRef"
        @delete="deleteImageHandler"
      />
    </div>
    <UFormGroup
      :label="eng.userName"
      name="name"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        :placeholder="eng.userName"
        icon="i-heroicons-user-circle-16-solid"
        v-model="user.name"
        inputClass="input-label"
      />
    </UFormGroup>
    <UFormGroup
      :label="eng.email"
      name="email"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        :placeholder="eng.email"
        icon="i-heroicons-envelope"
        v-model="user.email"
        inputClass="input-label"
      />
    </UFormGroup>
    <UFormGroup
      :label="eng.email"
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
      {{ eng.update }}
    </UButton>
  </UForm>
</template>
