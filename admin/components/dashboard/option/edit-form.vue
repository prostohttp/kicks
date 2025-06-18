<script lang="ts" setup>
import type { ModelRef } from "vue";
import type { InputData } from "~/types/ui/ui.types";
import { optionKeys } from "~/types/ui/ui.types";
import { validate } from "./validator";
import type { OptionDtoWithValues } from "~/server/api/option/dto/option.dto";

// define
const { optionData } = defineProps<{
    optionData: InputData[];
}>();
const isSubmit = defineModel("submit");
const state: ModelRef<OptionDtoWithValues | undefined> = defineModel("state");

// Store
const optionDataStore = useOptionDataStore();
const productDataStore = useProductDataStore();
await productDataStore.getAllProductsWithoutPagination();
const { option } = storeToRefs(optionDataStore);

// Vars
const isAdmin = checkIsAdmin();
const toast = useToast();
const types: string[] = Object.values(optionKeys);
const submitRef: Ref<HTMLFormElement | null> = ref(null);

// Handlers
const isVisibleTable = computed(
    () =>
        state.value?.type === optionKeys.list ||
        state.value?.type === optionKeys.select ||
        state.value?.type === optionKeys.checkbox,
);

const submitHandler = async () => {
    try {
        const optionValueIds: string[] = [];
        if (state.value?.values?.length && isVisibleTable.value) {
            for (const optValue of state.value.values) {
                if (!optValue.new) {
                    await optionDataStore.editOptionValueFromDatabase(optValue);
                    optionValueIds.push(optValue.value.value);
                } else {
                    const optionValue =
                        await optionDataStore.addNewOptionValueToDatabase(
                            optValue,
                        );
                    optionValueIds.push(optionValue._id!);
                }
            }
        } else if (state.value?.values?.length && !isVisibleTable.value) {
            for (const item of option.value?.values!) {
                await optionDataStore.deleteValue(item._id!);
            }
        }
        if (option.value?.values?.length) {
            for (const item of option.value.values) {
                if (
                    optionValueIds.length &&
                    !optionValueIds.includes(item._id!)
                ) {
                    await optionDataStore.deleteValue(item._id!);
                }
            }
        }
        console.log("optionValueIds", optionValueIds);

        await $fetch("/api/option/edit", {
            method: "PUT",
            body: {
                ...state.value,
                values: optionValueIds,
            },
        });

        await optionDataStore.getOption(
            useRoute("dashboard-options-option").params.option.toString(),
        );
        toast.add({
            title: "Option updated",
            color: "green",
        });
    } catch (error: any) {
        toast.add({ title: error.message, color: "red" });
    }
};

const onSubmit = useThrottleFn(submitHandler, 2000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));

// hooks
watch(isSubmit, () => {
    if (isSubmit.value) {
        submitRef.value?.submit();
        isSubmit.value = false;
    }
});
</script>

<template>
    <div class="flex flex-col gap-[20px] w-full pb-[20px]">
        <div v-if="state" class="flex flex-col w-full gap-[24px]">
            <UForm
                ref="submitRef"
                :state="state"
                :validate="validate"
                class="space-y-4 w-full"
                @submit="protectedSubmitHandler"
            >
                <UFormGroup
                    v-for="{ name, label, placeholder } in optionData"
                    :key="name"
                    :label="label"
                    :name="name"
                    :ui="{
                        label: {
                            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                        },
                    }"
                >
                    <UInput
                        v-if="name === 'title'"
                        v-model="state.title"
                        :placeholder="placeholder"
                        inputClass="no-left-icon"
                    />
                    <USelectMenu
                        v-else-if="name === 'type'"
                        v-model="state.type"
                        :options="types"
                        :placeholder="placeholder"
                        :ui="{
                            wrapper:
                                'select-wrapper ring-1 ring-dark-gray rounded-[8px]',
                        }"
                        :uiMenu="{
                            option: {
                                color: 'dark:text-[#6b7280]',
                            },
                        }"
                    />
                    <UInput
                        v-if="name === 'sort'"
                        v-model="state.sort"
                        :placeholder="placeholder"
                        inputClass="no-left-icon"
                        min="1"
                        required
                        type="number"
                    />
                </UFormGroup>
                <DashboardOptionEditTable
                    v-if="isVisibleTable"
                    v-model:state="state!.values"
                />
            </UForm>
        </div>
    </div>
</template>
