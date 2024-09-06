<script lang="ts" setup>
import type { InputData } from "~/types/ui/ui.types";
import { optionKeys } from "~/types/ui/ui.types";
import type { FormSubmitEvent } from "#ui/types";
import { validate } from "./validator";

// define
const { optionData } = defineProps<{
  optionData: InputData[];
}>();
const isSubmit = defineModel("submit");

// Store
const optionDataStore = useOptionDataStore();
const { option, isVisibleTable } = storeToRefs(optionDataStore);

// Vars
const isAdmin = useIsAdmin();
const toast = useToast();
const types: string[] = Object.values(optionKeys);
const submitRef: Ref<HTMLFormElement | null> = ref(null);

// Handlers
const submitHandler = async (event: FormSubmitEvent<any>) => {
  try {
    await $fetch("/api/option/edit", {
      method: "PUT",
      body: {
        _id: option.value._id,
        title: event.data.title,
        type: event.data.type,
        sort: event.data.sort,
        values: option.value.values,
      },
    });

    toast.add({
      title: "Option updated",
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
        <DashboardOptionEditTable
          v-if="optionDataStore.isVisibleTable"
          :optionId="option._id"
        />
      </UForm>
    </div>
  </div>
</template>
