<script lang="ts" setup>
import type { ModelRef } from "vue";
import type { InputData } from "~/types/ui/ui.types";
import { optionKeys } from "~/types/ui/ui.types";
import { validate } from "./validator";
import type { OptionDtoWithValues } from "~/server/api/option/dto/option.dto";

// define
const { optionData } = defineProps<{
  optionData: InputData[];
}>();
const isSubmit = defineModel("submit");
const state: ModelRef<OptionDtoWithValues | undefined> = defineModel("state");

// Store
const optionDataStore = useOptionDataStore();
const productDataStore = useProductDataStore();
await productDataStore.getAllProductsWithoutPagination();
const { option } = storeToRefs(optionDataStore);

// Vars
const isAdmin = useIsAdmin();
const toast = useToast();
const types: string[] = Object.values(optionKeys);
const submitRef: Ref<HTMLFormElement | null> = ref(null);

// Handlers
const isVisibleTable = computed(
  () =>
    state.value?.type === optionKeys.list ||
    state.value?.type === optionKeys.select ||
    state.value?.type === optionKeys.checkbox,
);

const submitHandler = async () => {
  try {
    const optionValueIds: string[] = [];
    if (state.value?.values?.length && isVisibleTable.value) {
      for (const optValue of state.value.values) {
        if (!optValue.new) {
          await optionDataStore.editOptionValueFromDatabase(optValue);
          optionValueIds.push(optValue.value.value);
        } else {
          const optionValue =
            await optionDataStore.addNewOptionValueToDatabase(optValue);
          optionValueIds.push(optionValue._id!);
        }
      }
    } else if (state.value?.values?.length && !isVisibleTable.value) {
      for (const id of option.value?.values!) {
        await optionDataStore.deleteValue(id);
      }
    }
    if (option.value?.values?.length) {
      for (const id of option.value.values) {
        if (optionValueIds.length && !optionValueIds.includes(id)) {
          await optionDataStore.deleteValue(id);
        }
      }
    }
    console.log("optionValueIds", optionValueIds);

    await $fetch("/api/option/edit", {
      method: "PUT",
      body: {
        ...state.value,
        values: optionValueIds,
      },
    });

    await optionDataStore.getOption(
      useRoute("dashboard-options-option").params.option.toString(),
    );
    toast.add({
      title: "Option updated",
      color: "green",
    });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};

const onSubmit = useThrottleFn(submitHandler, 2000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));

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
    <div class="flex flex-col w-full gap-[24px]" v-if="state">
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4 w-full"
        @submit="protectedSubmitHandler"
        ref="submitRef"
      >
        <UFormGroup
          v-for="{ name, label, placeholder } in optionData"
          :name="name"
          :key="name"
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
        <DashboardOptionEditTable
          v-if="isVisibleTable"
          v-model:state="state!.values"
        />
      </UForm>
    </div>
  </div>
</template>
