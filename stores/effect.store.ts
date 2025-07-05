const useEffectStore = defineStore("effect", () => {
  const isOn = ref<boolean>(false);

  const update = () => {
    if (isOn.value) {
      document.body.style.backgroundColor = "white";
      document.body.setAttribute("data-theme", "invert");
      return;
    }

    document.body.style.backgroundColor = "black";
    document.body.setAttribute("data-theme", "default");
  };

  const toggle = () => {
    isOn.value = !isOn.value;
    update();
  };

  onMounted(update);

  return { isOn, toggle };
});

export default useEffectStore;
