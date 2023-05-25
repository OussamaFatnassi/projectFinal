<script setup lang="ts">
definePageMeta({
  middleware: "protector",
});
const emailCookie = useCookie("email");
const email = ref(emailCookie.value);
</script>

<template>
  <InventoryHeader :email="email as string" />
  <InventoryTable />
</template>

<style></style>
