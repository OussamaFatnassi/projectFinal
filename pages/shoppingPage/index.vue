<script setup lang="ts">
definePageMeta({
  middleware: "protector",
});
const emailCookie = useCookie("email");
const email = ref(emailCookie.value);
const cart = useState("cart");
</script>

<template>
  <CustomHeader :email="email as string" />
  <ItemList />
</template>

<style></style>
