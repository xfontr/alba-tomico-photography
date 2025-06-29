import type { Locale } from "~/types/Locale";
import type { MenuItems } from "~/types/MenuItem";
import type { DynamicPath, PredefinedPath, StaticPath } from "~/types/Path";

export const DEFAULT_LOCALE: Locale = "en";

export const FRONTAL_IMAGE = "front";

export const MENU_ITEMS: MenuItems = [
  "work",
  "editorial",
  "travel",
  "still life",
];

export const STATIC_VIEWS: StaticPath[] = ["home", "menu", "contact"];
export const DYNAMIC_VIEWS: DynamicPath[] = [
  "work",
  "travel",
  "still-life",
  "editorial",
];
export const CHAOTIC_VIEWS: DynamicPath[] = ["work", "editorial", "still-life"];
export const AVAILABLE_PATHS: PredefinedPath[] = [
  ...DYNAMIC_VIEWS,
  ...STATIC_VIEWS,
];
