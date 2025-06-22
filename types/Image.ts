import type { FileObject } from "imagekit/dist/libs/interfaces";
import type { Locale } from "./Locale";

/**
 * Example date: "2025-06-17T17:29:24.838Z"
 * Example URL: "https://ik.imagekit.io/zgvic3orlk/home/01.jpg?updatedAt=1750414531306"
 * Example filePath: "/home/01.jpg"
 */
export type FullImage = FileObject & {
  customMetadata?: Partial<Record<Locale, string>>;
};

export type Image = {
  src: string;
  alt: string;
  front: boolean;
  post: string;
};

export type ImageInstance = {
  fillAlt: (locale: Locale, fallback: string) => void;
  image: Image;
  isImage: boolean;
};

export type ImagesInstance = {
  instances: ImageInstance[];
  getImages: () => Image[];
  fillAlts: (locale: Locale, fallback: string) => void;
};
