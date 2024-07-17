<script lang="ts" setup>
interface IImageModel {
  image: string;
}

// define
const { id } = defineProps<{
  id: number;
}>();
const model: Ref<IImageModel | undefined> = defineModel("image");
const activeId: Ref<string | undefined> = defineModel("activeId");
const inputRef: Ref<HTMLInputElement | undefined> = defineModel("inputRef");
const emit = defineEmits(["delete"]);

// vars
const isAdmin = useIsAdmin();

// handlers
const onClickHandler = () => {
  inputRef.value?.click();
  activeId.value = id.toString();
};
</script>

<template>
  <input type="file" ref="inputRef" class="hidden" v-if="isAdmin" />
  <UPopover :popper="{ placement: 'bottom-start' }">
    <div v-if="!model?.image" class="cursor-pointer">
      <img src="/no-image.svg" alt="No Image" class="lg:w-[40px] w-[40px]" />
    </div>
    <div class="w-full rounded-[8px] relative" v-else>
      <img
        :src="`/${model?.image}`"
        class="lg:w-[40px] w-[40px] rounded-[8px] group-hover:opacity-70 transition-opacity"
      />
    </div>
    <template #panel>
      <div class="flex gap-[5px] items-center py-[1px] px-[5px]" v-if="isAdmin">
        <UButton
          class="icon-button float-right"
          icon="i-heroicons-inbox-arrow-down-solid h-[20px] w-[20px]"
          @click="onClickHandler"
          v-if="!model?.image"
        />
        <UButton
          class="icon-button float-right"
          icon="i-heroicons-archive-box-x-mark-solid h-[20px] w-[20px]"
          @click="$emit('delete', id)"
          v-else
        />
      </div>
    </template>
  </UPopover>
</template>
