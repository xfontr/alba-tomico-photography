import type { Locale } from "~/types/Locale";
import type { MenuItems } from "~/types/MenuItem";
import type { DynamicPath, StaticPath } from "~/types/Path";

export const DEFAULT_LOCALE: Locale = "en";

export const FRONTAL_IMAGE = "front";

export const MENU_ITEMS: MenuItems = [
  "work",
  "editorial",
  "travel",
  "still life",
];

export const STATIC_VIEWS: StaticPath[] = ["home", "menu", "contact"];
export const DYNAMIC_VIEWS: DynamicPath[] = ["work", "editorial"];
