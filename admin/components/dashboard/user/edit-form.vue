<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import { locale } from "~/lang/locale";
import { Roles } from "~/types/server/server.types.js";
import { Constants } from "~/constants";
import * as v from "valibot";

// define
const { userId } = defineProps<{
    userId: string;
}>();
const emit = defineEmits(["close"]);

// store
const userDataStore = useUserDataStore();
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => userDataStore.getUserById(userId));
const { userById: user } = storeToRefs(userDataStore);

// vars
const isAdmin = checkIsAdmin();
const route = useRoute();
const page = Number(route.query.page);
const toast = useToast();
const dropZoneRef = ref<HTMLInputElement | undefined>();
const roles = Object.values(Roles).filter((role) => role !== Roles.ADMIN);
const schema = v.object({
    name: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(3, locale[settingsDataStore.locale].error.stringMin3),
    ),
    email: v.pipe(
        v.string(),
        v.email(locale[settingsDataStore.locale].error.invalidEmail),
    ),
    role: v.string(),
});

// handlers
const uploadImageHandler = async (formData: FormData) => {
    const uploadedImage = await $fetch("/api/image/add", {
        method: "POST",
        body: formData,
    });
    if (!uploadedImage) {
        toast.add({
            title: locale[settingsDataStore.locale].noImage,
            color: "red",
        });
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
        toast.add({
            title: locale[settingsDataStore.locale].imageUploaded,
            color: "green",
        });
    } catch (_error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
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
        toast.add({
            title: locale[settingsDataStore.locale].imageDeleted,
            color: "green",
        });
    } catch (_error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
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
            toast.add({
                title: locale[settingsDataStore.locale].imageDeleted,
                color: "green",
            });
        }
    } catch (error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
    }
};

useDropZone(dropZoneRef, { onDrop });

const onSubmitHandler = async (event: FormSubmitEvent<any>) => {
    try {
        console.log("Role", event.data.role);

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
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
            color: "red",
        });
    }
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
    <LazyUiEmpty v-if="!user" />
    <UForm
        v-else
        :schema="v.safeParser(schema)"
        :state="user"
        class="w-full flex flex-col gap-[20px]"
        @submit="protectedSubmitHandler"
    >
        <div
            class="rounded-[8px] basis-[40%] p-[5px] bg-fa-white dark:bg-[#2c2c2c] flex items-center justify-center relative group"
        >
            <UiImageUpload
                v-model:drop-zone-ref="dropZoneRef"
                v-model:image="user"
                :alt="user?.name"
                @change="uploadImage($event)"
                @delete="deleteImageHandler"
            />
        </div>
        <UFormGroup
            :label="locale[settingsDataStore.locale].userName"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="name"
        >
            <UInput
                v-model="user.name"
                :placeholder="locale[settingsDataStore.locale].userName"
                icon="i-heroicons-user-circle-16-solid"
                inputClass="input-label"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].email"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="email"
        >
            <UInput
                v-model="user.email"
                :placeholder="locale[settingsDataStore.locale].email"
                icon="i-heroicons-envelope"
                inputClass="input-label"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].role"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="role"
        >
            <USelectMenu
                v-model="user.role"
                :options="roles"
                leading
                leadingIcon="i-heroicons-shield-exclamation-20-solid"
                selectClass="select-label"
            />
        </UFormGroup>
        <UButton class="dark-button mt-[20px]" type="submit">
            {{ locale[settingsDataStore.locale].update }}
        </UButton>
    </UForm>
</template>
