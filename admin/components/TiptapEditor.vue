<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

// define
const { placeholder, content } = defineProps<{
  placeholder: string;
  content?: string;
}>();

const emit = defineEmits(["getValue"]);

// vars
const editor = useEditor({
  onBlur({ editor, event }) {
    emit("getValue", editor.getHTML());
  },
  content,
  extensions: [
    TiptapStarterKit,
    TiptapPlaceholder.configure({
      emptyEditorClass:
        "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      includeChildren: true,
      placeholder,
    }),
  ],
});

const editorRef = ref(null);
const isVisible = ref();

// handlers.value
onClickOutside(editorRef, () => (isVisible.value = false));

// hooks
onBeforeUnmount(() => {
  // @ts-ignore
  unref(editor).destroy();
});
</script>

<template>
  <div class="relative w-full min-h-[150px]">
    <div v-if="editor" v-show="isVisible" class="buttons" ref="editorRef">
      <UButton
        icon="i-heroicons-bold"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      />
      <UButton
        icon="i-heroicons-italic"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      />
      <UButton
        icon="i-heroicons-bars-3-bottom-left"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      />
      <UButton
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </UButton>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </button>
      <button
        icon=""
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        h4
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        h5
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        h6
      </button>
      <UButton
        icon="i-heroicons-list-bullet"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      />
      <UButton
        icon="i-heroicons-list-bullet-16-solid"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      />
      <UButton
        icon="i-heroicons-arrow-uturn-down"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      />
      <UButton
        icon="i-heroicons-arrow-path-solid"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      />
    </div>
    <TiptapEditorContent
      :editor="editor"
      @click="isVisible = true"
      class="editor"
    />
  </div>
</template>

<style scoped>
button {
  @apply bg-dark-gray text-fa-white dark:bg-yellow dark:text-dark-gray dark:hover:bg-fa-white hover:bg-yellow hover:text-dark-gray cursor-pointer z-10 flex items-center justify-center w-[32px] h-[32px] rounded-[8px];
}

.editor {
  @apply border rounded-[8px] border-[grey] dark:border-fa-white z-20;
}

.buttons {
  @apply absolute -top-[40px] left-0 flex gap-[5px];
}

.is-active {
  @apply bg-yellow text-dark-gray dark:bg-fa-white dark:text-dark-gray;
}
</style>
