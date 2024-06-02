<script lang="ts" setup>
import { schema, type Schema } from "./schema/user-info.schema";
import type { FormSubmitEvent } from "#ui/types";
import type { UserData } from "~/types/ui/ui.types";
import { eng } from "~/lang/eng";
import { Roles } from "~/types/server/server.types";
import { Constants } from "~/constants";

// define
const { userId, data } = defineProps<{
  userId: string;
  data: UserData[];
}>();

const emit = defineEmits(["close"]);

// store
const userStore = useUserDataStore();
await userStore.getUserById(userId);
const { userById: user } = storeToRefs(userStore);

// vars
const state = reactive({
  name: user.value?.name,
  email: user.value?.email,
  role: user.value?.role,
});
const isLoading = ref(false);
const page = useRoute().query.page as never as number;
const toast = useToast();
const inputRef = ref<HTMLInputElement | undefined>();
const dropZoneRef = ref<HTMLDivElement | undefined>();
const roles = Object.values(Roles).filter((role) => role !== Roles.ADMIN);

// handlers
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

    await userStore.getAllUsers(page);
    await userStore.getUserById(userId);
    toast.add({ title: eng.imageUploaded, color: "green" });
    isLoading.value = false;
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
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
    await userStore.getAllUsers(page);
    await userStore.getUserById(userId);
    inputRef.value!.value = "";
    toast.add({ title: eng.imageDeleted, color: "green" });
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong, color: "red" });
  }
};

const onDrop = (files: File[] | null) => {
  if (files && user.value) {
    uploadImage(user.value?._id, files[0]);
  }
};

useDropZone(dropZoneRef, { onDrop });

const inputHandler = (e: Event) => {
  let fileInput = e.target as HTMLInputElement;
  if (user.value) {
    uploadImage(user.value._id, fileInput.files![0]);
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

    await userStore.getAllUsers(page);

    toast.add({
      title: "Profile updated",
      color: "green",
    });
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
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    @submit="onSubmit"
    class="w-full flex flex-col gap-[20px]"
  >
    <div
      class="rounded-[8px] basis-[40%] p-[20px] bg-fa-white dark:bg-[#2c2c2c] flex items-center justify-center relative group"
    >
      <input type="file" ref="inputRef" class="hidden" />
      <div
        v-if="!user?.image"
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
        <img
          :src="`/${user.image}`"
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
    <UFormGroup
      v-for="{ name, label, placeholder, icon, type } in data"
      :label="label"
      :name="name"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <template v-if="type === 'select'">
        <USelectMenu
          v-model="state[name as keyof typeof state]"
          :options="roles"
          :leadingIcon="icon"
          leading
          selectClass="select-label"
        />
      </template>
      <template v-else>
        <UInput
          :placeholder="placeholder"
          :icon="icon"
          v-model="state[name as keyof typeof state]"
          inputClass="input-label"
          :type="type ? type : 'text'"
        />
      </template>
    </UFormGroup>
    <UButton type="submit" class="dark-button mt-[20px]">
      {{ eng.update }}
    </UButton>
  </UForm>
</template>
