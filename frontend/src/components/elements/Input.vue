<script setup lang="ts">
import { Component } from "vue";

type inputTypes =
	| "text"
	| "password"
	| "email"
	| "number"
	| "color"
	| "date"
	| "datetime-local"
	| "month"
	| "tel"
	| "time"
	| "url"
	| "week";

const props = defineProps<{
	type: inputTypes;
	placeholder?: string;
	disabled?: boolean;
	label?: string;
	icon?: Component;
}>();
const value = defineModel("value");
const message = defineModel("message");
const inputId = Math.random().toString(36).substring(2);
</script>

<template>
	<div class="input">
		<label :for="inputId" v-if="props.label" class="input-label">
			{{ props.label }}
		</label>
		<div class="relative flex items-center">
			<input
				:type="props.type"
				v-model="value"
				:id="inputId"
				:placeholder="props.placeholder"
				:disabled="props.disabled"
				class="input-field"
				:class="{
					'pr-[40px]': props.icon,
				}"
			/>
			<span v-show="props.icon" class="top-1/2 right-[16px] absolute -translate-y-1/2">
				<props.icon />
			</span>
		</div>
		<span v-show="message" class="input-message">
			{{ message }}
		</span>
	</div>
</template>
