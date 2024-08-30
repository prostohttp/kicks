<script lang="ts" setup>
import type { ModelRef } from "vue";
import type { ProductDto } from "~/server/api/product/dto/product.dto";

// define
const state: ModelRef<ProductDto> = defineModel("state", {
  required: true,
  default: {} as ProductDto,
});
</script>

<template>
  <div class="flex lg:flex-row flex-col-reverse justify-between mt-[40px]">
    <DashboardProductDataFields v-model:state="state" />
    <DashboardProductDataImages v-model:state="state" />
  </div>
  <!-- <pre>{{ state }}</pre> -->
</template>
