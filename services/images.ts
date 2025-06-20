import type {
  FileObject,
  ListFileResponse,
} from "imagekit/dist/libs/interfaces";
import { DEFAULT_LOCALE, FRONTAL_IMAGE } from "~/configs/contants";
import type { FullImage, Image } from "~/types/Image";
import type { Locale } from "~/types/Locale";

const images = (locale: Locale) => {
  const { t } = useI18n();

  const getImage = (file: FullImage): Image | undefined => {
    if (file.fileType !== "image") return;

    const meta = file.customMetadata;

    return {
      alt:
        meta?.[locale] ??
        meta?.[DEFAULT_LOCALE] ??
        (t("global.default_alt") as string),
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
