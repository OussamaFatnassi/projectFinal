import axios from "axios";

export default function useProducts() {
  const products = ref<any>([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://fakestoreapi.com/products");
      products.value = response.data;
    } catch (err) {
      error.value = err as any;
    } finally {
      loading.value = false;
    }
  };

  return { products, loading, error, fetchProducts };
}
