<script lang="ts" setup></script>

<template>
  <div class="dark:text-white">
    <DashboardSidebar />
    <div>
      <DashboardHeader />
      <slot />
      <DashboardFooter />
    </div>
  </div>
</template>
