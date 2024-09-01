<script lang="ts" setup>
import type { ModelRef } from "vue";

// define
const tags: ModelRef<string[]> = defineModel("tags", {
  required: true,
  default: [],
});

// vars
const tagRef: Ref<HTMLInputElement | undefined> = ref();

// handlers
const addTagHandler = (e: any) => {
  const value = e.target.value as string;
  if (value.trim().length) {
    if (!tags.value.includes(value.trim())) {
      tags.value.push(value);
    }
    e.target.value = "";
  }
};

const deleteTagHandler = (id: number) => {
  tags.value.splice(id, 1);
  tagRef.value!.focus();
};

// hooks
</script>

<template>
  <div>
    <input
      class="input-label-without-icon w-full border border-dark-gray dark:border-[#374151] dark:bg-dark-bg"
      @keypress.enter.prevent="addTagHandler"
      ref="tagRef"
    />
    <div class="flex gap-[10px] mt-[10px] items-center flex-wrap">
      <DashboardProductTagsItem
        v-for="(tag, index) in tags"
        :tag="tag"
        :index="index"
        @delete="deleteTagHandler"
      />
    </div>
  </div>
</template>
