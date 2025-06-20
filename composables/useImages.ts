import images from "~/services/images";
import type { Image } from "~/types/Image";
import type { Locale } from "~/types/Locale";
import type { Path } from "~/types/Path";

const useImages = () => {
  const api = useApi();
  const locale = useI18n().$getLocale() as Locale;
  const { getImagesFromList } = images(locale);

  const list = ref<Image[]>([]);

  const update = async (...paths: Path[]) => {
    const allImageFiles = await Promise.all(paths.map(api.getPath));
    list.value = allImageFiles.flatMap((list) => getImagesFromList(list));
  };

  return { list, update };
};

export default useImages;
