export const addBrackets = <T extends string>(text: T): `[ ${T} ]` =>
  `[ ${text} ]`;
