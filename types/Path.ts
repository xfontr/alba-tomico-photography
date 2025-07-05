export type StaticPath = "home" | "contact" | "still-life" | "travel";
export type DynamicPath = "work" | "editorial";

export type PredefinedPath = StaticPath | DynamicPath;

export type Path = PredefinedPath | (string & NonNullable<unknown>);
