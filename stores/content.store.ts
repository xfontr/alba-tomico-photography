import type { Entry } from "~/types/Entry";
import type { PredefinedPath } from "~/types/Path";

const useContentStore = defineStore("content", () => {
  const content = ref<Partial<Record<PredefinedPath, Entry>>>({});

  const setView = (key: PredefinedPath, entry: Entry) => {
    content.value[key] = entry;
  };

  return { setView, content };
});

export default useContentStore;
