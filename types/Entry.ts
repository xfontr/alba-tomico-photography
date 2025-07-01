import type { Image } from "./Image";

export type Entry = {
  name: string;
  path: string;
  index: number;
  children?: (Entry | Image)[];
};

export interface EntryWithImages extends Entry {
  children: Image[];
}

export type Entries = { instances: EntryInstance[]; getEntries: () => Entry[] };

export type EntryInstance = {
  get: () => Entry;
  addChildren: (...children: (Image | Entry)[]) => void;
  isFolder: boolean;
};
