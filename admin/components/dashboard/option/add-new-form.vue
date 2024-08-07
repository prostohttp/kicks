<script lang="ts" setup>
import type { InputData } from "~/types/ui/ui.types";
import { optionTypes } from "~/types/ui/ui.types";
import { type Schema } from "./schema/option-schema";
import type { FormSubmitEvent } from "#ui/types";
import { validate } from "./validator";

// define
const { optionData } = defineProps<{
  optionData: InputData[];
}>();
const isSubmit = defineModel();

// Store
const optionDataStore = useOptionDataStore();
const { option, isVisibleTable } = storeToRefs(optionDataStore);

// Vars
const isAdmin = useIsAdmin();
const toast = useToast();
const types: string[] = Object.keys(optionTypes).map((label) => label);
const submitRef: Ref<HTMLFormElement | null> = ref(null);

// Handlers
const clearState = () => {
  option.value.title = "";
  option.value.type = "";
  option.value.sort = undefined;
  option.value.values = [];
};

const submitHandler = async (event: FormSubmitEvent<Schema>) => {
  try {
    await $fetch("/api/option/add", {
      method: "POST",
      body: {
        title: event.data.title,
        type: event.data.type,
        sort: event.data.sort,
        values: option.value.values,
      },
    });
    clearState();
    toast.add({
      title: "Option added",
      color: "green",
    });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};

const onSubmit = useThrottleFn(submitHandler, 2000);

// hooks
watch(isSubmit, () => {
  if (isSubmit.value) {
    submitRef.value?.submit();
    isSubmit.value = false;
  }
});

watch(isVisibleTable, (newValue) => {
  if (!newValue) {
    option.value.values = [];
  }
});

onUnmounted(() => {
  clearState();
});

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
  <div class="flex flex-col gap-[20px] w-full pb-[20px]">
    <div class="flex flex-col w-full gap-[24px]">
      <UForm
        :validate="validate"
        :state="option"
        class="space-y-4 w-full"
        @submit="protectedSubmitHandler"
        ref="submitRef"
      >
        <UFormGroup
          v-for="{ name, label, placeholder } in optionData"
          :name="name"
          :label="label"
          :key="name"
          :ui="{
            label: {
              base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
            },
          }"
        >
          <UInput
            :placeholder="placeholder"
            inputClass="no-left-icon"
            v-model="option.title"
            v-if="name === 'title'"
          />
          <USelectMenu
            :options="types"
            :placeholder="placeholder"
            v-model="option.type"
            :uiMenu="{
              option: {
                color: 'dark:text-[#6b7280]',
              },
            }"
            :ui="{
              wrapper: 'select-wrapper ring-1 ring-dark-gray rounded-[8px]',
            }"
            v-else-if="name === 'type'"
          />
          <UInput
            :placeholder="placeholder"
            v-model="option.sort"
            inputClass="no-left-icon"
            v-if="name === 'sort'"
            required
            type="number"
            min="1"
          />
        </UFormGroup>
        <DashboardOptionAddNewTable v-if="isVisibleTable" />
      </UForm>
    </div>
  </div>
</template>
