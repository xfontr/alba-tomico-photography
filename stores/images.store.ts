import type { Image } from "~/types/Image";
import type { PredefinedPath } from "~/types/Path";

const useImageStore = defineStore("images", () => {
  const images = ref<Partial<Record<PredefinedPath, Image[]>>>({});

  const setView = (key: PredefinedPath, list: Image[]) => {
    images.value[key] = list;
  };

  return { setView, images };
});

export default useImageStore;
