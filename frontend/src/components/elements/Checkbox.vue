<script setup lang="ts">
interface CheckboxProps {
	label: string;
	disabled?: boolean;
}

export interface CheckboxModel {
	checked: boolean;
	part?: boolean;
}

const props = defineProps<CheckboxProps>();
const model = defineModel<CheckboxModel>();

const checkboxHandler = () => {
	if (!props.disabled && model.value) {
		model.value!.checked = !model.value?.checked;
		if (model.value.part) {
			model.value!.part = false;
		}
	}
};
</script>

<template>
	<div
		class="checkbox"
		@click="checkboxHandler"
		:class="{
			'full-filled': model?.checked && !model?.part,
			'part-filled': model?.part,
			'opacity-15': props.disabled,
		}"
	>
		<input
			type="checkbox"
			:aria-label="props.label"
			v-model="model!.checked"
			class="hidden"
			:disabled="props.disabled"
		/>
	</div>
</template>
