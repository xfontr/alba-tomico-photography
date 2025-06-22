import type { ListFileResponse } from "imagekit/dist/libs/interfaces";
import { DYNAMIC_VIEWS, STATIC_VIEWS } from "~/configs/constants";
import Entries from "~/helpers/Entries";
import Entry from "~/helpers/Entry";
import Image from "~/helpers/Image";
import Images from "~/helpers/Images";
import useImageStore from "~/stores/images.store";
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

  await Promise.all(
    DYNAMIC_VIEWS.map(async (view) => {
      cache[view] = await api.getFolders(view);
    })
  );

  STATIC_VIEWS.forEach((view) => {
    const current = cache[view];

    if (!current) return;

    const instances = Images(current.filter(isFileObject).map(Image));
    instances.fillAlts(locale, t("global.default_alt") as string);
    store.setView(view as PredefinedPath, instances.getImages());
  });

  DYNAMIC_VIEWS.forEach((view) => {
    const current = cache[view];

    if (!current) return;

    const { instances } = Entries(current.filter(isFolderObject).map(Entry));
    store.setView(view as PredefinedPath, instances as any);
  });

  console.log(store.images);
});
