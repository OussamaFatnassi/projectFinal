<script setup lang="ts">
const props = defineProps({
  products: Object,
});
const nuxtApp = useNuxtApp();
const { $redis } = nuxtApp as any;
const emailCookie = useCookie("email");
const email = ref(emailCookie.value);

const { products, loading, error, fetchProducts } = useProducts();
fetchProducts();

const inventoryTable = ref({});

const saveInventory = async () => {
  const inventory = products.value.map((product: any) => ({
    id: product.id,
    amount: product.amount,
  }));
  await $redis.set(email.value, JSON.stringify(inventory));
};

const loadInventory = async () => {
  const inventory = await $redis.get(email.value);
  if (inventory) {
    const parsedInventory = inventory;
    for (let i = 0; i < parsedInventory.length; i++) {
      const id = parsedInventory[i].id;
      const amount = parsedInventory[i].amount;

      for (let j = 0; j < products.value.length; j++) {
        if (products.value[j].id === id) {
          products.value[j].amount = amount;
          break;
        }
      }
    }
  }
};
const initializeProducts = (products: any[]) => {
  products.forEach((product) => {
    product.amount = 0; 
  });
};

const fetchAndInitializeProducts = async () => {
  await fetchProducts();
  initializeProducts(products.value);
};

const addToInventory = async (product: any) => {
  product.amount += 1;
  await saveInventory();
};
const removeFromInventory = async (product: any) => {
  product.amount = product.amount > 0 ? product.amount - 1 : 0;
  await saveInventory();
};


onMounted(async () => {
    await fetchAndInitializeProducts();
    await loadInventory();
});
</script>

<template>
  <table class="table-auto border-collapse border border-green-800 w-full">
    <thead>
      <th class="border border-green-800">ID</th>
      <th class="border border-green-800">Title</th>
      <th class="border border-green-800">Price</th>
      <th class="border border-green-800">Amount</th>
      <th class="border border-green-800">Action</th>
    </thead>

    <tbody>
      <tr v-for="product in products as any">
        <td class="border border-green-800">{{ product.id }}</td>
        <td class="border border-green-800">{{ product.title }}</td>
        <td class="border border-green-800">{{ product.price }}</td>
        <td class="border border-green-800">{{ product.amount }}</td>
        <td class="border border-green-800 flex justify-center gap-2">
            <UButton
                @click="addToInventory(product)"
                class="bg-blue-500 hover:bg-blue-600"
            >
                Add
            </UButton>
            <UButton
                @click="removeFromInventory(product)"
                class="bg-blue-500 hover:bg-blue-600"
            >
                Remove
            </UButton>
        </td>
      </tr>
    </tbody>
  </table>
  <div >
    Total:{{ products.reduce((acc: any, product: any) => acc + product.amount * product.price, 0) }} $
  </div>
</template>

<style></style>
