import type { Locale } from "~/types/Locale";
import type { MenuItem } from "~/types/MenuItem";
import type { Path } from "~/types/Path";

export const DEFAULT_LOCALE: Locale = "en";

export const FRONTAL_IMAGE = "front";

export const MENU_ITEMS: MenuItem[] = [
  {
    key: "work",
    img: { alt: "", src: "menu/work" },
    to: "/work",
  },
  {
    key: "editorial",
    img: { alt: "", src: "menu/editorial" },
    to: "/editorial",
  },
  {
    key: "travel",
    img: { alt: "", src: "menu/travel" },
    to: "/travel",
  },
  {
    key: "still_life",
    img: { alt: "", src: "menu/still-life" },
    to: "/still-life",
  },
];

export const VALID_PATHS: Path[] = ["home", "work", "editorial"];
