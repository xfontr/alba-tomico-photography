import { DEFAULT_LOCALE, FRONTAL_IMAGE } from "../configs/constants";
import type {
  FullImage,
  ImageInstance,
  Image as ImageModel,
} from "~/types/Image";

const Image = (file: FullImage): ImageInstance => {
  const image: ImageModel = {
    alt: "",
    src: file.url,
    front: !!file.tags?.includes(FRONTAL_IMAGE),
    post: file.filePath?.split("/").slice(0, -1).join("/"),
  };

  const fillAlt: ImageInstance["fillAlt"] = (locale, defaultText): void => {
    image.alt =
      file.customMetadata?.[locale] ??
      file.customMetadata?.[DEFAULT_LOCALE] ??
      defaultText;
  };

  return {
    image,
    fillAlt,
    isImage: file.fileType === "image",
  };
};

export default Image;
