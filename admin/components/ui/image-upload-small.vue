<script lang="ts" setup>
// define
const model: Ref<string | undefined> = defineModel();
const emit = defineEmits(["delete", "change"]);

// vars
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const isAdmin = useIsAdmin();

// handlers
const onClickHandler = () => {
  inputRef.value?.click();
};

const deleteImageHandler = () => {
  inputRef.value!.value = "";
  emit("delete");
};
</script>

<template>
  <input
    type="file"
    @change="$emit('change', $event)"
    ref="inputRef"
    class="hidden"
    v-if="isAdmin"
  />
  <UPopover :popper="{ placement: 'bottom-start' }">
    <div v-if="!model" class="cursor-pointer">
      <NuxtImg
        src="/no-image.svg"
        width="40"
        alt="No Image"
        class="lg:w-[40px] w-[40px]"
      />
    </div>
    <div class="w-full rounded-[8px] relative" v-else>
      <NuxtImg
        :src="`/${model}`"
        width="60"
        class="lg:w-[40px] w-[40px] rounded-[8px] group-hover:opacity-70 transition-opacity"
      />
    </div>
    <template #panel>
      <div class="flex gap-[5px] items-center py-[1px] px-[5px]" v-if="isAdmin">
        <UButton
          class="icon-button float-right"
          icon="i-heroicons-inbox-arrow-down-solid"
          @click="onClickHandler()"
          v-if="!model"
        />
        <UButton
          class="icon-button float-right"
          icon="i-heroicons-archive-box-x-mark-solid"
          @click="deleteImageHandler()"
          v-else
        />
      </div>
    </template>
  </UPopover>
</template>
