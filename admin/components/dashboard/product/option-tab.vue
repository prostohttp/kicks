<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { ProductOptionDto } from "~/pages/dashboard/products/product.dto";

// define
const options = defineModel("options", {
  required: true,
  default: [] as ProductOptionDto[] | undefined,
});

// store
const optionDataStore = useOptionDataStore();
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => optionDataStore.getAllTitles());
const { titles } = storeToRefs(optionDataStore);

// vars
const activeTab = ref(0);
const optionTitles = computed(() => titles.value.map((el) => el.title));
const optionModel = ref("");
const option = computed(() =>
  titles.value.find((el) => el.title === optionModel.value),
);

// handlers
const changeOptionHandler = () => {
  options.value.push({
    id: Date.now(),
    title: optionModel.value,
    value: "",
    type: option.value!.type,
    sort: 1,
    required: false,
    values: [],
  });
  optionModel.value = "";
};

const deleteOption = (id: number) => {
  options.value.splice(id, 1);
};
</script>

<template>
  <div
    class="flex lg:flex-row flex-col-reverse justify-between mt-[40px] gap-[40px]"
  >
    <div class="lg:w-[30%] w-full flex flex-col gap-[10px] lg:mb-0 mb-[20px]">
      <h2
        class="text-gray-700 dark:text-gray-200 font-[Rubik] font-[600] text-[20px] leading-[20px] mb-[5px]"
      >
        {{ locale[settingsDataStore.locale].option }}
      </h2>
      <div
        v-for="(option, index) in options"
        :key="index"
        class="cursor-pointer py-[10px] pl-[20px] pr-[10px] rounded-[8px] flex justify-between items-center"
        :class="{ 'active-tab': activeTab === index }"
        @click="activeTab = index"
      >
        <span>{{ option.title }}</span>
        <UButton
          class="icon-button"
          icon="i-heroicons-minus-circle-16-solid"
          type="button"
          @click="deleteOption(index)"
        />
      </div>
      <UFormGroup
        name="option"
        :ui="{
          label: {
            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
          },
        }"
      >
        <USelectMenu
          v-model="optionModel"
          :options="optionTitles"
          :placeholder="locale[settingsDataStore.locale].addOption"
          @change="changeOptionHandler"
          :uiMenu="{
            option: {
              base: 'h-[35px]',
              color: 'dark:text-[#6b7280]',
            },
          }"
          :ui="{
            wrapper:
              'select-wrapper ring-1 ring-dark-gray rounded-[8px] my-[10px]',
          }"
        />
      </UFormGroup>
    </div>
    <div class="lg:w-[70%] w-full">
      <DashboardProductOptionTabItem
        v-for="(option, index) in options"
        :id="option.id"
        v-model:options="options"
        v-model:activeTab="activeTab"
        v-show="index === activeTab"
        :key="option.id"
        @click="activeTab = index"
      />
    </div>
  </div>
  <!-- <pre>{{ options }}</pre> -->
</template>

<style scoped>
.active-tab {
  @apply bg-dark-gray text-fa-white dark:bg-dark-bg dark:text-fa-white;
}

.active-tab .icon-button {
  @apply text-fa-white;
}
</style>
