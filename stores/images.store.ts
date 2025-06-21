import type { Image } from "~/types/Image";
import type { PredefinedPath } from "~/types/Path";

const useImageStore = defineStore("images", () => {
  const images = ref<Map<PredefinedPath, Image[]>>(new Map());

  const setView = (key: PredefinedPath, list: Image[]) => {
    images.value.set(key, list);
  };

  return { setView, images };
});

export default useImageStore;
