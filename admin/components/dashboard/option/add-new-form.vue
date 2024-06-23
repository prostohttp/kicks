<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { InputData } from "~/types/ui/ui.types";
import { optionTypes } from "~/types/ui/ui.types";
import { schema, type Schema } from "./schema/option-schema";
import * as v from "valibot";
import type { FormSubmitEvent } from "#ui/types";

// define
const { optionData } = defineProps<{
  optionData: InputData[];
}>();
const isSubmit = defineModel();

// Store
const optionDataStore = useOptionDataStore();
const { state } = storeToRefs(optionDataStore);

// Vars
const options: Ref<{ [key: string]: any }[]> = ref([]);
const types: string[] = Object.keys(optionTypes).map((label) => label);

const isVisibleTable = computed(
  () =>
    state.value.type === eng.optionTypes.list ||
    state.value.type === eng.optionTypes.select ||
    state.value.type === eng.optionTypes.checkbox,
);
const submitRef: Ref<HTMLFormElement | null> = ref(null);

// Handlers
const submit = async (event: FormSubmitEvent<Schema>) => {
  console.log(event.data);
};

// hooks
watch(isSubmit, () => {
  if (isSubmit.value) {
    submitRef.value?.submit();
    isSubmit.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col gap-[20px] w-full pb-[20px]">
    <div class="flex flex-col w-full gap-[24px]">
      <UForm
        :schema="v.safeParser(schema)"
        :state="state"
        class="space-y-4 w-full"
        @submit="submit"
        ref="submitRef"
      >
        <UFormGroup
          v-for="{ name, label, placeholder } in optionData"
          :name="name"
          :label="label"
          :ui="{
            label: {
              base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
            },
          }"
        >
          <UInput
            :placeholder="placeholder"
            inputClass="no-left-icon"
            v-model="state.title"
            v-if="name === 'title'"
          />
          <USelectMenu
            :options="types"
            :placeholder="placeholder"
            v-model="state.type"
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
            v-model="state.sort"
            inputClass="no-left-icon"
            v-if="name === 'sort'"
            required
            type="number"
            min="1"
          />
        </UFormGroup>
        <DashboardOptionAddNewTable v-if="isVisibleTable" v-model="options" />
      </UForm>
    </div>
  </div>
</template>
