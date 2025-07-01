import type { Entries as EntriesInstance, EntryInstance } from "~/types/Entry";

const Entries = (entries: EntryInstance[]): EntriesInstance => {
  const instances: EntryInstance[] = entries.filter(({ isFolder }) => isFolder);

  const getEntries = () =>
    instances.map(({ get }) => get()).sort((a, b) => a.index - b.index);

  return { instances, getEntries };
};

export default Entries;
