<script lang="ts" setup>
import type { InputData } from "~/types/ui/ui.types";
import { optionKeys } from "~/types/ui/ui.types";
import { validate } from "./validator";
import type { OptionDtoWithValues } from "~/server/api/option/dto/option.dto";

// define
const { optionData } = defineProps<{
    optionData: InputData[];
}>();
const isSubmit = defineModel();

// store
const optionDataStore = useOptionDataStore();

// Vars
const isAdmin = checkIsAdmin();
const toast = useToast();
const types: string[] = Object.values(optionKeys);
const submitRef: Ref<HTMLFormElement | null> = ref(null);

const state: OptionDtoWithValues = reactive({
    title: "",
    type: "",
    sort: 1,
    values: [],
});

// Handlers
const isVisibleTable = computed(
    () =>
        state.type === optionKeys.list ||
        state.type === optionKeys.select ||
        state.type === optionKeys.checkbox,
);

const clearState = () => {
    state.title = "";
    state.type = "";
    state.sort = 1;
    state.values = [];
};

const submitHandler = async () => {
    try {
        const optionValueIds: string[] = [];
        if (state?.values) {
            for (const value of state.values) {
                const { _id, ...optionWithoutId } = value;
                const optionValue =
                    await optionDataStore.addNewOptionValueToDatabase(
                        optionWithoutId,
                    );
                optionValueIds.push(optionValue._id!);
            }
        }
        await $fetch("/api/option/add", {
            method: "POST",
            body: {
                ...state,
                values: optionValueIds,
            },
        });
        clearState();
        toast.add({
            title: "Option added",
            color: "green",
        });
    } catch (error: any) {
        toast.add({ title: error.message, color: "red" });
    }
};

const onSubmit = useThrottleFn(submitHandler, 2000);

// hooks
watch(isSubmit, () => {
    if (isSubmit.value) {
        submitRef.value?.submit();
        isSubmit.value = false;
    }
});

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
    <div class="flex flex-col gap-[20px] w-full pb-[20px]">
        <div class="flex flex-col w-full gap-[24px]">
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
                <DashboardOptionAddNewTable
                    v-if="isVisibleTable"
                    v-model:state="state"
                />
            </UForm>
        </div>
    </div>
</template>
