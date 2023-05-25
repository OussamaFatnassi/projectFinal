<script setup>
const emailInput = ref("");
const emailCookie = useCookie("email");
function setCookie(cookie) {
  emailCookie.value = cookie;
  navigateTo("/shoppingPage");
}
</script>

<template>
  <div class="center">
    <h1>Welcome to my Store</h1>
    <UInput
      appearance="white"
      size="sm"
      placeholder="Email"
      type="email"
      @keyup.enter="setCookie(emailInput)"
      v-model="emailInput"
      name="email"
    />
  </div>
</template>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
</style>
