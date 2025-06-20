import entries from "~/services/entries";
import type { Entry } from "~/types/Entry";

const usePosts = () => {
  const api = useApi();
  const list = ref<Entry[]>([]);

  const update = async () => {
    list.value = entries().getEntries(await api.getFolders("works"));
  };

  const allPaths = (): string[] => list.value.map(({ path }) => path);

  return {
    list,
    update,
    allPaths,
  };
};

export default usePosts;
