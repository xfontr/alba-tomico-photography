import type {
  FileObject,
  ListFileResponse,
} from "imagekit/dist/libs/interfaces";
import { DEFAULT_LOCALE, FRONTAL_IMAGE } from "../configs/constants";
import type { FullImage, Image } from "~/types/Image";
import type { Locale } from "~/types/Locale";

const images = (locale: Locale) => {
  const getImage = ({
    customMetadata: meta,
    ...file
  }: FullImage): Image | undefined => {
    if (file.fileType !== "image") return;

    const alt: string = meta?.[locale] ?? meta?.[DEFAULT_LOCALE] ?? "";

    return {
      alt,
      src: file.url,
      front: !!file.tags?.includes(FRONTAL_IMAGE),
      post: file.filePath.split("/").slice(0, -1).join("/"),
    };
  };

  const getImagesFromList = (list: ListFileResponse): Image[] =>
    list.map((file) => getImage(file as FileObject)).filter(Boolean) as Image[];

  return {
    getImage,
    getImagesFromList,
  };
};

export default images;
