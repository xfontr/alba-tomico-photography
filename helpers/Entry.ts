import type { FolderObject } from "imagekit/dist/libs/interfaces";
import type { Entry as BaseEntry, EntryInstance } from "~/types/Entry";

type EntryData = {
  name: string;
  folderPath: string;
  type: FolderObject["type"];
};

const Entry = (folder: EntryData): EntryInstance => {
  const entry: BaseEntry = {
    name: getName(folder.name),
    path: folder.folderPath,
    index: -1,
  };

  entry.index = getIndex(entry.name);

  const addChildren: EntryInstance["addChildren"] = (...children) => {
    entry.children ??= [];
    entry.children.push(...children);
  };

  return {
    get: () => entry,
    addChildren,
    isFolder: folder.type === "folder",
  };
};

export default Entry;
