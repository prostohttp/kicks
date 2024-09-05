<script lang="ts" setup>
import type { ProductOptionDto } from "~/pages/dashboard/products/product.dto";

// define
const option = defineModel("option", {
  required: true,
  default: {} as ProductOptionDto | undefined,
});
</script>

<template>
  <div>table</div>
  <pre>{{ option }}</pre>
</template>
