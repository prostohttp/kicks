<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { InputData } from "~/types/ui/ui.types";
import { optionTypes } from "~/types/ui/ui.types";

// define
const { optionData } = defineProps<{
  optionData: InputData[];
}>();

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

// Handlers
</script>

<template>
  <div class="flex flex-col gap-[20px] w-full pb-[20px]">
    <div class="flex flex-col w-full gap-[24px]">
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
            wrapper: 'select-wrapper',
          }"
          v-else-if="name === 'type'"
        />
        <UInput
          :placeholder="placeholder"
          v-model="state.sort"
          inputClass="no-left-icon"
          v-if="name === 'sort'"
          type="number"
          min="1"
        />
      </UFormGroup>
    </div>
    <DashboardOptionAddNewTable
      v-if="isVisibleTable"
      v-model:options="options"
    />
  </div>
</template>
