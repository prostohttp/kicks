<script lang="ts" setup>
import type { ProductDto } from "~/server/api/product/dto/product.dto";

// define
const { product, sales, remaining } = defineProps<{
  product: ProductDto;
  sales: number;
  remaining: number;
}>();
// store

// vars

// handlers

// hooks
</script>

<template>
  <div>
    <div>{{ product.title }}</div>
    <div>{{ product.image }}</div>
    <div>{{ product.description }}</div>
    <div>{{ product.regularPrice }}</div>
    <div>{{ product.salePrice }}</div>
    <div>{{ sales }}</div>
    <div>{{ remaining }}</div>
  </div>
</template>
