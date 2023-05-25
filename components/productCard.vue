<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  loading: Boolean,
});
</script>

<template>
  <UCard v-if="!loading" class="w-64">
    <template #header>
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-48 object-cover"
      />
    </template>
    <h1 class="text-xl font-bold overflow-clip h-15 line-clamp-1">
      {{ product.title }}
    </h1>
    <p class="text-gray-500 line-clamp-3 h-20">{{ product.description }}</p>
    <template #footer>
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold">{{ product.price }} $</h1>
        <UButton
          @click="$emit('add-to-cart', product)"
          class="bg-blue-500 hover:bg-blue-600"
        >
          Add to Cart
        </UButton>
      </div>
    </template>
  </UCard>
  <!-- skeleton to show while loading -->
  <USkeleton v-else>
    <template #header>
      <div class="w-full h-48 bg-gray-200"></div>
    </template>
    <template #body>
      <div class="w-full h-4 bg-gray-200"></div>
      <div class="w-full h-4 bg-gray-200"></div>
      <div class="w-full h-4 bg-gray-200"></div>
    </template>
    <template #footer>
      <div class="w-full h-4 bg-gray-200"></div>
    </template>
  </USkeleton>
</template>

<style></style>
