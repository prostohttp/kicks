<script lang="ts" setup>
import { eng } from "~/lang/eng";
</script>

<template>
  <ul class="flex flex-col gap-[10px]">
    <DashboardSidebarMenuItem
      to="/dashboard"
      icon="i-heroicons-squares-plus"
      :title="eng.dashboard"
    />
    <DashboardSidebarMenuItem
      to="/dashboard/products"
      icon="i-heroicons-list-bullet"
      :title="eng.allProducts"
    />
    <DashboardSidebarMenuItem
      to="/dashboard/orders"
      icon="i-heroicons-clipboard-document-list"
      :title="eng.allOrders"
    />
    <DashboardSidebarMenuItem
      to="/dashboard/brands"
      icon="i-heroicons-user-group"
      :title="eng.allBrands"
    />
    <DashboardSidebarMenuItem
      to="/dashboard/articles"
      icon="i-heroicons-newspaper"
      :title="eng.allArticles"
    />
    <DashboardSidebarMenuItem
      to="/dashboard/users"
      icon="i-heroicons-finger-print"
      :title="eng.allUsers"
    />
    <DashboardSidebarMenuItem
      to="/dashboard/options"
      icon="i-heroicons-chart-bar"
      :title="eng.allOptions"
    />
  </ul>
</template>
