<script setup lang="ts">
const props = defineProps({
  email: String,
});
const isOpen = ref(false);

const cart = useState("cart", () => [] as any[]);
</script>

<template>
  <div class="bg-gray-700 grid grid-cols-3 gap-4 p-4">
    <h1 class="text-4xl font-bold">Welcome to my Store</h1>
    <h2 class="text-2xl font-bold">
      {{ email }}
    </h2>
    <div class="flex justify-center items-center">
      <UButton
        label="Cart"
        @click="isOpen = true"
        class="w-20 h-10 justify-center items-center"
      />
    </div>
    <USlideover v-model="isOpen">
      <div
        class="grid grid-cols-3 gap-4 h-20 border-gray-500 border-2"
        v-for="product in cart"
      >
        <h1 class="text-1xl font-bold overflow-clip">{{ product.title }}</h1>
        <h2 class="text-1xl font-bold">{{ product.price }} $</h2>
        <div class="w-20 h-20 flex justify-center items-center">
          <UButton
            label="Remove"
            @click="cart.splice(cart.indexOf(product), 1)"
            class="w-fit-content h-10"
          />
        </div>
      </div>
      <div class="flex justify-center items-center">
        <h1 class="text-2xl font-bold">
          Total: {{ cart.reduce((acc, cur) => acc + cur.price, 0) }} $
        </h1>
      </div>
    </USlideover>
  </div>
</template>

<style></style>
