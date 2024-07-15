<script lang="ts" setup>
import { eng } from "~/lang/eng";
import { schema, type Schema } from "./schema/add-new-category.schema";
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
const { titles: data, category, selected } = storeToRefs(categoryStore);

await useAsyncData("titles", () => categoryStore.getAllTitles());
await useAsyncData("category", () => categoryStore.getCategoryById(categoryId));
const titles = ref(
  data.value
    .filter((el) => el.title !== category.value?.title)
    .map((el) => el.title),
);

// vars
const isAdmin = useIsAdmin();
const toast = useToast();
const state = reactive({
  title: category.value?.title,
  description: category.value?.description,
  isParent: category.value?.isParent,
  isEnabled: category.value?.isEnabled,
  children: category.value?.children.map((el) => el.title),
});
const page = Number(useRoute().query.page);

// handlers
const onSubmitHandler = async (event: FormSubmitEvent<Schema>) => {
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
    toast.add({ title: eng.successEdit });
    emit("close");
  } catch (_error) {
    toast.add({ title: eng.somethingWentWrong });
  }
};

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
  <UiEmpty v-if="!category" />
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
      <UCheckbox
        v-if="type === 'checkbox'"
        :label="placeholder"
        v-model="state[name as keyof typeof state]"
        class="mb-[25px]"
        :ui="{
          label: 'dark:text-[#6b7280] text-[16px]',
        }"
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
      <UTextarea
        v-model="state.description"
        :placeholder="placeholder"
        class="textarea"
        v-else-if="type === 'textarea'"
      />
      <UInput
        :placeholder="placeholder"
        v-model="state[name as keyof typeof state]"
        inputClass="input-label"
        :icon="icon"
        class="mb-[25px]"
        v-else
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
        {{ eng.cancel }}
      </UButton>
      <UButton
        type="submit"
        class="red-button uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white px-[30px] flex sm:w-auto w-full text-center justify-center"
      >
        {{ eng.save }}
      </UButton>
    </div>
  </UForm>
</template>
