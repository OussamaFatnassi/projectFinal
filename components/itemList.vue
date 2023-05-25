<script setup>
import useProducts from "~/composables/useProducts";

const { products, loading, error, fetchProducts } = useProducts();

fetchProducts();
const cart = useState('cart', () => []);
watch(cart, (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true });
const loadCart = () => {
    try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            cart.value = parsedCart;
        }
    } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
    }
}
const search = ref("");
const filteredProducts = computed(() => {
  if (search.value === "") return products.value;
  return products.value.filter((product) =>
    product.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

const categories = computed(() => {
  const categories = new Set();
  products.value.forEach((product) => {
    categories.add(product.category);
  });
  return categories;
});

const selectedCategory = ref(null);

const filterCategory = (category) => {
  selectedCategory.value = category;
};

const filteredProductsByCategory = computed(() => {
  let filtered = products.value;

  if (search.value !== "") {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(
      (product) => product.category === selectedCategory.value
    );
  }

  return filtered;
});

const clearCategory = () => {
  selectedCategory.value = null;
};
loadCart();
</script>

<template>
  <div class="flex justify-center items-center p-4">
    <UInput v-model="search" placeholder="Search" name="search" />
  </div>
  <div class="flex justify-center items-center p-4">
    <div class="grid grid-cols-5 gap-4">
      <UButton
        v-for="category in categories"
        :label="category"
        @click="filterCategory(category)"
      />
      <UButton label="All" @click="clearCategory" />
    </div>
  </div>
  <div class="flex justify-center items-center">
    <div class="grid grid-cols-4 gap-4">
      <ProductCard
        v-for="product in filteredProductsByCategory"
        :product="product"
        :cart="cart"
        @addToCart="cart.push(product)"
      />
    </div>
  </div>
</template>

<style></style>
