<script lang="ts" setup>
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { OrderStatusDto } from "~/server/api/order-status/dto/order-status.dto";
import { SettingsLocale } from "~/types/ui/ui.types";
import { SettingsCurrency } from "~/types/ui/ui.types";

// TODO: USelectMenu в таких компонентах когда значение {label, value} нужно передавать значение массива const selected = ref(options[1]) v-model="selected"

// store
const settingsDataStore = useSettingsDataStore();
const orderDataStore = useOrderDataStore();
await useAsyncData(() => settingsDataStore.getSettings());
const { settings } = storeToRefs(settingsDataStore);
await useAsyncData(() => orderDataStore.getOrderStatusList());
const { orderStatusList } = storeToRefs(orderDataStore);
const { data: startData } = await useAsyncData<OrderStatusDto>(() =>
    orderDataStore.getOrderStatus(settings.value?.startOrderStatus!),
);
const { data: endData } = await useAsyncData<OrderStatusDto>(() =>
    orderDataStore.getOrderStatus(settings.value?.endOrderStatus!),
);

// vars
const dropZoneRef = ref<HTMLInputElement | undefined>();
const toast = useToast();
const localeOptions = [
    {
        label: locale.en.russian,
        value: SettingsLocale.ru,
    },
    {
        label: locale.en.english,
        value: SettingsLocale.en,
    },
];

const currencyOptions = [
    {
        label: locale.en.rub,
        value: SettingsCurrency.rub,
    },
    {
        label: locale.en.usd,
        value: SettingsCurrency.usd,
    },
];

const orderStatusOptions = computed(() => {
    return orderStatusList.value.map((status) => ({
        label: status[settingsDataStore.locale],
        value: status._id,
    }));
});

const startOrderStatus = ref(
    orderStatusOptions.value.find(
        (status) => status.value === startData.value?._id,
    ),
);

const endOrderStatus = ref(
    orderStatusOptions.value.find(
        (status) => status.value === endData.value?._id,
    ),
);

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
    await $fetch("/api/settings/edit", {
        method: "PUT",
        body: {
            image: uploadedImage,
        },
    });
    settings.value!.image = uploadedImage;
};

const uploadImage = async (e: Event) => {
    try {
        let fileInput = e.target as HTMLInputElement;
        const formData = new FormData();
        if (fileInput.files![0]) {
            formData.append("folderName", Constants.IMG_PUBLIC);
            formData.append("image", fileInput.files![0]);
        }
        await uploadImageHandler(formData);
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

const onDrop = async (files: File[] | null) => {
    try {
        if (files) {
            const formData = new FormData();
            if (files![0]) {
                formData.append("folderName", Constants.IMG_PUBLIC);
                formData.append("image", files![0]);
            }
            await uploadImageHandler(formData);
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

const deleteImageHandler = async () => {
    try {
        await $fetch("/api/image/remove", {
            method: "DELETE",
            body: {
                image: settings.value!.image,
            },
        });
        settings.value!.image = "";
        await $fetch("/api/settings/edit", {
            method: "PUT",
            body: {
                image: "",
            },
        });
        toast.add({
            title: locale[settingsDataStore.locale].imageDeleted,
            color: "green",
        });
    } catch (error: any) {
        toast.add({
            title: error.message,
            color: "red",
        });
    }
};

// hooks
watch(startOrderStatus, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        settings.value!.startOrderStatus = newValue!.value;
    }
});

watch(endOrderStatus, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        settings.value!.endOrderStatus = newValue!.value!;
    }
});

watch(
    // FIXME: Сделать рефакторинг
    () => settingsDataStore.locale,
    async () => {
        const startData = await orderDataStore.getOrderStatus(
            settings.value?.startOrderStatus!,
        );
        const endData = await orderDataStore.getOrderStatus(
            settings.value?.endOrderStatus!,
        );
        startOrderStatus.value = orderStatusOptions.value.find(
            (status) => status.value === startData!._id,
        );
        endOrderStatus.value = orderStatusOptions.value.find(
            (status) => status.value === endData!._id,
        );
    },
);
</script>

<template>
    <div class="flex lg:flex-row flex-col-reverse justify-between mt-[40px]">
        <div class="lg:w-[65%] w-full flex flex-col gap-[20px]">
            <UFormGroup
                :label="locale[settingsDataStore.locale].localeDashboard"
                :ui="{
                    label: {
                        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                    },
                }"
                name="localeDashboard"
            >
                <USelectMenu
                    v-model="settings!.localeDashboard!"
                    :options="localeOptions"
                    selectClass="select-label-without-icon"
                />
            </UFormGroup>
            <UFormGroup
                :label="locale[settingsDataStore.locale].localeStore"
                :ui="{
                    label: {
                        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                    },
                }"
                name="localeStore"
            >
                <USelectMenu
                    v-model="settings!.localeStore"
                    :options="localeOptions"
                    selectClass="select-label-without-icon"
                />
            </UFormGroup>
            <UFormGroup
                :label="locale[settingsDataStore.locale].mainCurrency"
                :ui="{
                    label: {
                        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                    },
                }"
                name="mainCurrency"
            >
                <USelectMenu
                    v-model="settings!.mainCurrency"
                    :options="currencyOptions"
                    selectClass="select-label-without-icon"
                />
            </UFormGroup>
            <UFormGroup
                :label="locale[settingsDataStore.locale].secondCurrencyRate"
                :ui="{
                    label: {
                        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                    },
                }"
                name="secondCurrencyRate"
            >
                <UInput
                    v-model="settings!.secondCurrencyRate"
                    inputClass="input-label-without-icon"
                    type="number"
                />
            </UFormGroup>
            <UFormGroup
                :label="locale[settingsDataStore.locale].currency"
                :ui="{
                    label: {
                        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                    },
                }"
                name="currency"
            >
                <USelectMenu
                    v-model="settings!.currency"
                    :options="currencyOptions"
                    selectClass="select-label-without-icon"
                />
            </UFormGroup>
            <UFormGroup
                :label="locale[settingsDataStore.locale].startOrderStatus"
                :ui="{
                    label: {
                        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                    },
                }"
                name="startOrderStatus"
            >
                <USelectMenu
                    v-model="startOrderStatus"
                    :options="orderStatusOptions"
                    selectClass="select-label-without-icon"
                />
            </UFormGroup>
            <UFormGroup
                :label="locale[settingsDataStore.locale].endOrderStatus"
                :ui="{
                    label: {
                        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                    },
                }"
                name="endOrderStatus"
            >
                <USelectMenu
                    v-model="endOrderStatus"
                    :options="orderStatusOptions"
                    selectClass="select-label-without-icon"
                />
            </UFormGroup>
        </div>
        <div
            class="lg:w-[32%] w-full flex flex-col gap-[20px] lg:mb-0 mb-[20px]"
        >
            <UFormGroup
                :label="locale[settingsDataStore.locale].logo"
                :ui="{
                    label: {
                        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                    },
                }"
                name="image"
            >
                <UiImageUpload
                    v-model:drop-zone-ref="dropZoneRef"
                    v-model:image="settings"
                    :classForDarkMode="'dark:invert-[1] dark:invert-1'"
                    alt="logo"
                    @change="uploadImage($event)"
                    @delete="deleteImageHandler"
                />
            </UFormGroup>
        </div>
    </div>
    <!-- <pre>{{ settings }}</pre>
  <pre>{{ startOrderStatus }}</pre>
  <pre>{{ endOrderStatus }}</pre> -->
</template>
