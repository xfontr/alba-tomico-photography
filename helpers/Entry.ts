import type { FolderObject } from "imagekit/dist/libs/interfaces";
import type { Entry as EntryInstance } from "~/types/Entry";

const Entry = (folder: FolderObject): EntryInstance => ({
  name: folder.name,
  path: folder.folderPath,
  isFolder: folder.type === "folder",
});

export default Entry;
