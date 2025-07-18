import type { Locale } from "~/types/Locale";
import type { MenuItems } from "~/types/MenuItem";
import type { DynamicPath, PredefinedPath, StaticPath } from "~/types/Path";

export const DEFAULT_LOCALE: Locale = "en";

export const FRONTAL_IMAGE = "front";

/**
 * TODO: Replace this junk code with config objects
 */

export const MENU_ITEMS: MenuItems = [
  "home",
  "work",
  "editorial",
  "travel",
  "still-life",
];

export const STATIC_VIEWS: StaticPath[] = [
  "home",
  "contact",
  "still-life",
  "travel",
];
export const DYNAMIC_VIEWS: DynamicPath[] = ["work", "editorial"];
export const CHAOTIC_VIEWS: PredefinedPath[] = ["still-life", "editorial"];
export const AVAILABLE_PATHS: PredefinedPath[] = [
  ...DYNAMIC_VIEWS,
  ...STATIC_VIEWS,
];
export const ZOOMABLE_VIEWS: PredefinedPath[] = ["travel"];
