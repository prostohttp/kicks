<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { FormSubmitEvent } from "#ui/types";
import { useCategoryDataStore } from "~/stores/category-data";
import type { InputData } from "~/types/ui/ui.types";
import * as v from "valibot";

// define
const emit = defineEmits(["close"]);
const { inputData, categoryId } = defineProps<{
    inputData: InputData[];
    categoryId: string;
}>();

// store
const categoryStore = useCategoryDataStore();
const settingsDataStore = useSettingsDataStore();
const { titles: data, category, selected } = storeToRefs(categoryStore);
await useAsyncData(() => categoryStore.getAllTitles());
await useAsyncData(() => categoryStore.getCategoryById(categoryId));
const titles = ref(
    data.value
        .filter((el) => el.title !== category.value?.title)
        .map((el) => el.title),
);

// vars
const isAdmin = checkIsAdmin();
const toast = useToast();
const state = reactive({
    title: category.value?.title,
    description: category.value?.description,
    isParent: category.value?.isParent,
    isEnabled: category.value?.isEnabled,
    children: category.value?.children.map((el) => el.title),
});
const page = Number(useRoute().query.page);
const schema = v.object({
    title: v.pipe(
        v.string(locale[settingsDataStore.locale].error.required),
        v.trim(),
        v.minLength(3, locale[settingsDataStore.locale].error.stringMin3),
    ),
    description: v.string(),
    children: v.array(v.string()),
    isParent: v.boolean(),
    isEnabled: v.boolean(),
});

// handlers
const onSubmitHandler = async (event: FormSubmitEvent<any>) => {
    try {
        await $fetch("/api/category/edit", {
            method: "PUT",
            body: {
                _id: category.value?._id,
                title: event.data.title,
                description: event.data.description,
                isParent: event.data.isParent,
                isEnabled: event.data.isEnabled,
                children: data.value.filter(
                    (el) =>
                        event.data.children?.includes(el.title) &&
                        el.title !== category.value?.title,
                ),
            },
        });
        categoryStore.getAllCategories(page);
        categoryStore.getAllTitles();
        selected.value = [];
        toast.add({ title: locale[settingsDataStore.locale].successEdit });
        emit("close");
    } catch (_error) {
        toast.add({
            title: locale[settingsDataStore.locale].somethingWentWrong,
        });
    }
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
    <LazyUiEmpty v-if="!category" />
    <UForm
        :schema="v.safeParser(schema)"
        :state="state"
        class="space-y-4"
        @submit="protectedSubmitHandler"
        v-else
    >
        <UFormGroup
            v-for="{ name, label, placeholder, icon, type } in inputData"
            :label="type === 'checkbox' ? '' : label"
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
                v-model="state.title"
                inputClass="input-label"
                :icon="icon"
                class="mb-[25px]"
                v-if="name === 'title'"
            />
            <UTextarea
                v-model="state.description"
                :placeholder="placeholder"
                class="textarea"
                v-else-if="name === 'description'"
            />
            <USelectMenu
                :icon="icon"
                multiple
                v-model="state.children"
                :options="titles"
                :placeholder="placeholder"
                class="mb-[25px]"
                :uiMenu="{
                    option: {
                        color: 'dark:text-[#6b7280]',
                    },
                }"
                :ui="{
                    wrapper:
                        'select-wrapper-with-icon ring-1 ring-dark-gray rounded-[8px]',
                }"
                v-else-if="type === 'select'"
            />
            <UCheckbox
                v-if="name === 'isParent'"
                :label="placeholder"
                v-model="state.isParent"
                class="mb-[25px]"
                :ui="{
                    label: 'dark:text-[#6b7280] text-[16px]',
                }"
            />
            <UCheckbox
                v-if="name === 'isEnabled'"
                :label="placeholder"
                v-model="state.isEnabled"
                class="mb-[25px]"
                :ui="{
                    label: 'dark:text-[#6b7280] text-[16px]',
                }"
            />
        </UFormGroup>
        <div
            class="flex sm:gap-[20px] pt-[20px] justify-end sm:flex-row flex-col gap-[10px]"
            v-if="isAdmin"
        >
            <UButton
                class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase px-[30px] flex sm:w-auto w-full text-center justify-center"
                @click="$emit('close')"
            >
                {{ locale[settingsDataStore.locale].cancel }}
            </UButton>
            <UButton
                type="submit"
                class="red-button uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white px-[30px] flex sm:w-auto w-full text-center justify-center"
            >
                {{ locale[settingsDataStore.locale].save }}
            </UButton>
        </div>
    </UForm>
</template>
