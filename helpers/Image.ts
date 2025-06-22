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
    post: file.filePath?.split("/").slice(0, -1).join("/").toLowerCase(),
    name: new URL(file.url).pathname.split("/").at(-1)?.split(".")[0],
  };

  const fillAlt: ImageInstance["fillAlt"] = (locale, defaultText): void => {
    image.alt =
      file.customMetadata?.[locale] ??
      file.customMetadata?.[DEFAULT_LOCALE] ??
      defaultText;
  };

  return {
    get: () => image,
    fillAlt,
    isImage: file.fileType === "image",
  };
};

export default Image;
