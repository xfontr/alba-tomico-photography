import type { Entry } from "~/types/Entry";
import type { Path } from "~/types/Path";

const usePosts = () => {
  const api = useApi();
  const list = ref<Entry[]>([]);

  const update = async (path: Path) => {
    // list.value = entries().getEntries(await api.getFolders(path));
  };

  const allPaths = (): string[] => list.value.map(({ path }) => path);

  return {
    list,
    update,
    allPaths,
  };
};

export default usePosts;
