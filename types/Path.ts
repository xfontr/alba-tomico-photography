export type Path =
  | ("home" | "work" | "editorial")
  | (string & NonNullable<unknown>);
