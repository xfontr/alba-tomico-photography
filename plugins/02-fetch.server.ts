import type { ListFileResponse } from "imagekit/dist/libs/interfaces";
import { STATIC_VIEWS } from "~/configs/constants";
import Images from "~/helpers/Images";
import useImageStore from "~/stores/images.store";
import type { ImagesInstance } from "~/types/Image";
import type { Locale } from "~/types/Locale";
import type { PredefinedPath } from "~/types/Path";

export default defineNuxtPlugin(async () => {
  const api = useApi();
  const { t, getLocale } = useI18n();
  const locale = getLocale() as Locale;
  const store = useImageStore(usePinia());

  const cache: Partial<Record<PredefinedPath, ListFileResponse>> = {};

  await Promise.all(
    STATIC_VIEWS.map(async (view) => {
      cache[view] = await api.getPath(view);
    })
  );

  Object.entries(cache).forEach(([view, images]) => {
    const instances = Images(images);
    instances.fillAlts(locale, t("global.default_alt") as string);
    store.setView(view as PredefinedPath, instances.getImages());
  });
});
