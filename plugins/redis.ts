import { Redis } from "@upstash/redis/cloudflare";
export default defineNuxtPlugin((nuxtApp) => {
  const redisClient = new Redis({
    url: "https://closing-seasnail-35331.upstash.io",
    token: nuxtApp.$config.public.TOKEN,
  });

  return {
    provide: {
      redis : redisClient as Redis
    }
  };
});
