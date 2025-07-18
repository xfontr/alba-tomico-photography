import type { Entry, EntryWithImages } from "~/types/Entry";
import type { Image } from "~/types/Image";
import type { DynamicPath, PredefinedPath } from "~/types/Path";

const useContentStore = defineStore("content", () => {
  const content = ref<Partial<Record<PredefinedPath, Entry>>>({});

  const setView = (key: PredefinedPath, entry: Entry) => {
    content.value[key] = entry;
  };

  const getImages = (key: PredefinedPath): Image[] =>
    (content.value[key]?.children ?? []) as Image[];

  const getFolders = (key: PredefinedPath): EntryWithImages[] =>
    (content.value[key]?.children ?? []) as EntryWithImages[];

  const getFrontals = (key: DynamicPath) => {
    const children = content.value[key]?.children ?? [];
    const isOnlyFrontals = !!(children[0] as Image)?.src;

    if (!isOnlyFrontals) {
      return (
        getFolders(key)
          ?.flatMap((child) => child.children?.filter(({ front }) => front))
          .flat() ?? []
      );
    }

    return children as Image[];
  };

  return { setView, getFrontals, getFolders, getImages, content };
});

export default useContentStore;
