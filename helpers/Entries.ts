import type { Entries as EntriesInstance, Entry } from "~/types/Entry";

const Entries = (entries: Entry[]): EntriesInstance => ({
  instances: entries.filter(({ isFolder }) => isFolder),
});

export default Entries;
