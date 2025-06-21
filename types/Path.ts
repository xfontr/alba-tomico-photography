export type StaticPath = "home" | "menu" | "contact";
export type DynamicPath = "work" | "editorial";

export type PredefinedPath = StaticPath | DynamicPath;

export type Path = PredefinedPath | (string & NonNullable<unknown>);
