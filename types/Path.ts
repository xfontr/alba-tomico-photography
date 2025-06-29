export type StaticPath = "home" | "contact";
export type DynamicPath = "work" | "editorial" | "still-life" | "travel";

export type PredefinedPath = StaticPath | DynamicPath;

export type Path = PredefinedPath | (string & NonNullable<unknown>);
