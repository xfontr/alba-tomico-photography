import api from "~/services/api";

export default defineNuxtPlugin((nuxt) => {
  const config = useRuntimeConfig().public.imageKit;

  nuxt.provide("api", api(imageKit(config)));
});
