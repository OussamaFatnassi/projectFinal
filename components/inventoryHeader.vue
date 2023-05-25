<script setup lang="ts">
const props = defineProps({
  email: String,
});
</script>

<template>
  <div class="bg-gray-700 grid grid-cols-3 gap-4 p-4">
    <h1 class="text-4xl font-bold">Welcome to the inventory</h1>
    <h2 class="text-2xl font-bold">
      {{ email }}
    </h2>
  </div>
</template>

<style></style>
