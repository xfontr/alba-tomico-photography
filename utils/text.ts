export const addBrackets = <T extends string>(text: T): `[ ${T} ]` =>
  `[ ${text} ]`;

export const getIndex = (name?: string): number =>
  Number(name?.split("-")?.[0]) || -1;

export const getName = (nameWithIndex: string): string => {
  const [_, ...rest] = nameWithIndex.toLowerCase().split("-");
  return rest.join(" ");
};

export const getRelativePath = (url: string): string => {
  const paths = url.split("/").slice(0, -1);

  return paths.length === 2
    ? getName(paths[1])
    : `/${paths[1]}/${getName(paths[2])}`;
};
