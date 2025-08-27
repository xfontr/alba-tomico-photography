import type { ListFileResponse } from "imagekit/dist/libs/interfaces";
import { DYNAMIC_VIEWS, STATIC_VIEWS } from "~/configs/constants";
import Entries from "~/helpers/Entries";
import Entry from "~/helpers/Entry";
import Image from "~/helpers/Image";
import Images from "~/helpers/Images";
import useContentStore from "~/stores/content.store";
import type { Locale } from "~/types/Locale";
import type { PredefinedPath } from "~/types/Path";

export default defineNuxtPlugin(async () => {
  const api = useApi();
  const { t, getLocale } = useI18n();
  const locale = getLocale() as Locale;
  const content = useContentStore(usePinia());

  const cache: Partial<Record<PredefinedPath, ListFileResponse>> = {};

  const getAndTransformResources = async () => {
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

      const imgs = Images(current.filter(isFileObject).map(Image));
      imgs.fillAlts(locale, t("global.default_alt") as string);

      const entry = Entry({
        folderPath: view,
        name: view,
        type: "folder",
      });

      entry.addChildren(...imgs.getImages());
      content.setView(view, entry.get());
    });

    await Promise.all(
      DYNAMIC_VIEWS.map(async (view) => {
        const current = cache[view];
        if (!current) return;

        const entries = Entries(current.filter(isFolderObject).map(Entry));

        await Promise.all(
          entries.instances.map(async (instance) => {
            const files = await api.getPath(instance.get().path);

            const imgs = Images(files.filter(isFileObject).map(Image));
            imgs.fillAlts(locale, t("global.default_alt") as string);

            instance.addChildren(...imgs.getImages());
          })
        );

        const mainEntry = Entry({
          folderPath: view,
          name: view,
          type: "folder",
        });

        mainEntry.addChildren(...entries.getEntries());

        content.setView(view, mainEntry.get());
      })
    );
  };

  const MAX_RETRIES = 3;

  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await getAndTransformResources();
      return;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      retries++;
      await new Promise((res) => setTimeout(res, retries * 1500));
    }
  }

  throw createError({ statusCode: 500 });
});
