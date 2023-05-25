export default defineNuxtRouteMiddleware((to, from) => {
  const emailCookie = useCookie("email");

  if (!emailCookie.value) {
    return navigate("/");
  }
});
