export default defineNuxtPlugin(async () => {
  const reloads = ref<number>(0);

  const MAX_RELOADS = 2;

  const reload = () => {
    if (reloads.value >= MAX_RELOADS) return;

    location.reload();
    reloads.value += 1;
  };

  window.addEventListener("unhandledrejection", reload);
  window.addEventListener("error", reload);

  onScopeDispose(() => {
    window.removeEventListener("unhandledrejection", reload);
    window.removeEventListener("error", reload);
  });
});
