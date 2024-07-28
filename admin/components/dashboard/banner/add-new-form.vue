<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import type { FormError } from "#ui/types";
import { eng } from "~/lang/eng";

interface BannerTab {
  id: number;
  title: string;
}

// define

// store
const bannerDataSrore = useBannerDataStore();
const { banner } = storeToRefs(bannerDataSrore);

// vars
const isAdmin = useIsAdmin();
const toast = useToast();
const activeTab = ref(0);
const bannerTabs: Ref<BannerTab[]> = ref(
  banner.value.banners.map(() => ({
    id: ++activeTab.value,
    title: eng.newBanner,
  })),
);

// handlers
const submitHandler = async (event: FormSubmitEvent<any>) => {};
const onSubmit = useThrottleFn(submitHandler, 2000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

const addNewBanner = () => {
  const id = Date.now();
  banner.value.banners.push({
    id,
    heading: "",
    description: "",
    image: "",
    url: "",
    sort: undefined,
  });
  bannerTabs.value.push({
    id,
    title: eng.newBanner,
  });
};

const deleteBanner = (id: number) => {
  banner.value.banners.splice(id, 1);
  bannerTabs.value.splice(id, 1);
};

// hooks
</script>

<template>
  <UForm
    :validate="validate"
    :state="banner"
    class="space-y-4 w-full"
    @submit="protectedSubmitHandler"
    ref="submitRef"
  >
    <UFormGroup
      name="title"
      :label="eng.title"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        :placeholder="eng.title"
        inputClass="no-left-icon"
        v-model="banner.title"
      />
    </UFormGroup>
    <div class="flex flex-col lg:flex-row gap-[40px] py-[20px] justify-between">
      <div class="flex flex-col gap-[10px] lg:w-[30%] w-full">
        <UButton
          class="icon-button float-right mr-[15px] mb-[10px]"
          icon="i-heroicons-plus-circle-16-solid"
          type="button"
          @click="addNewBanner"
        >
          {{ eng.addNewBanner }}
        </UButton>
        <div
          v-for="(tab, index) in bannerTabs"
          :key="tab.id"
          class="cursor-pointer py-[10px] pl-[20px] pr-[10px] rounded-[8px] flex justify-between items-center"
          :class="{ 'active-tab': activeTab === index }"
          @click="activeTab = index"
        >
          <span>{{ `${eng.newBanner} ${index + 1}` }}</span>
          <UButton
            class="icon-button"
            icon="i-heroicons-minus-circle-16-solid"
            type="button"
            @click="deleteBanner(index)"
          />
        </div>
      </div>
      <div class="lg:w-[70%] w-full">
        <DashboardBannerFormItem
          v-for="(item, index) in banner.banners"
          :index="index"
          v-show="index === activeTab"
        />
      </div>
    </div>
    <UButton type="submit" class="dark-button float-end">
      {{ eng.save }}
    </UButton>
    <!-- <pre>{{ banner.banners }}</pre> -->
  </UForm>
</template>

<style scoped>
.active-tab {
  @apply bg-dark-gray text-fa-white dark:bg-dark-bg dark:text-fa-white;
}
</style>
