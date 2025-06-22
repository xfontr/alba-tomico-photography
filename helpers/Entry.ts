import type { FolderObject } from "imagekit/dist/libs/interfaces";
import type { Entry as BaseEntry, EntryInstance } from "~/types/Entry";

type EntryData = {
  name: string;
  folderPath: string;
  type: FolderObject["type"];
};

const Entry = (folder: EntryData): EntryInstance => {
  const entry: BaseEntry = {
    name: folder.name.toLowerCase(),
    path: folder.folderPath,
  };

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
