<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { BreadcrumbItem, InputData } from "~/types/ui/ui.types";
import {
  schema,
  type Schema,
} from "~/components/dashboard/option/schema/option-schema";
import type { FormSubmitEvent } from "#ui/types";

// store
const optionDataStore = useOptionDataStore();
const { state } = storeToRefs(optionDataStore);

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));
const optionData: InputData[] = [
  {
    label: eng.title,
    name: "title",
    type: "text",
    placeholder: eng.title,
  },
  {
    label: eng.type,
    name: "type",
    type: "select",
    placeholder: eng.typeText,
  },
  {
    label: eng.sort,
    name: "sort",
    type: "number",
    placeholder: eng.sort,
  },
];
const formRef: Ref<HTMLFormElement | null> = ref(null);

// handlers
const submitHandler = async (event: FormSubmitEvent<Schema>) => {
  const parsed = schema.safeParse(state.value);
  if (parsed.success) {
    formRef.value?.submit();
  }
};

const submit = useThrottleFn(submitHandler, 1000);

// meta
useHead({
  title: eng.addNewOption,
});
</script>

<template>
  <div
    class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
  >
    <DashboardBreadcrumbs :links="links" :title="eng.addNewOption" />
    <UButton
      class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase fon-[Rubik] font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
      icon="i-heroicons-clipboard-document-20-solid"
      @click="submit"
      :label="eng.addNewOption"
    />
  </div>
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 w-full"
        @submit="submit"
        ref="formRef"
      >
        <DashboardOptionAddNewForm :optionData="optionData" />
      </UForm>
    </div>
  </main>
</template>
