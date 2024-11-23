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
const isAdmin = useIsAdmin();
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
                :validate="validate"
                :state="state"
                class="space-y-4 w-full"
                @submit="protectedSubmitHandler"
                ref="submitRef"
            >
                <UFormGroup
                    v-for="{ name, label, placeholder } in optionData"
                    :name="name"
                    :label="label"
                    :key="name"
                    :ui="{
                        label: {
                            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                        },
                    }"
                >
                    <UInput
                        :placeholder="placeholder"
                        inputClass="no-left-icon"
                        v-model="state.title"
                        v-if="name === 'title'"
                    />
                    <USelectMenu
                        :options="types"
                        :placeholder="placeholder"
                        v-model="state.type"
                        :uiMenu="{
                            option: {
                                color: 'dark:text-[#6b7280]',
                            },
                        }"
                        :ui="{
                            wrapper:
                                'select-wrapper ring-1 ring-dark-gray rounded-[8px]',
                        }"
                        v-else-if="name === 'type'"
                    />
                    <UInput
                        :placeholder="placeholder"
                        v-model="state.sort"
                        inputClass="no-left-icon"
                        v-if="name === 'sort'"
                        required
                        type="number"
                        min="1"
                    />
                </UFormGroup>
                <DashboardOptionAddNewTable
                    v-model:state="state"
                    v-if="isVisibleTable"
                />
            </UForm>
        </div>
    </div>
</template>
