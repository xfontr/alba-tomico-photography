import type {
  FolderObject,
  ListFileResponse,
} from "imagekit/dist/libs/interfaces";
import type { Entry } from "~/types/Entry";

const entries = () => {
  const getEntry = ({ name, folderPath: path }: FolderObject): Entry => ({
    name,
    path,
  });

  const getEntries = (list: ListFileResponse): Entry[] =>
    list
      .filter(({ type }) => type === "folder")
      .map((entry) => getEntry(entry as FolderObject));

  return {
    getEntries,
  };
};

export default entries;
