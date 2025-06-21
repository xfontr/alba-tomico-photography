import type { ListFileResponse } from "imagekit/dist/libs/interfaces";
import Image from "./Image";
import type { ImageInstance, ImagesInstance } from "~/types/Image";
import { isFileObject } from "~/utils/imageKit";

const Images = (list: ListFileResponse): ImagesInstance => {
  const instances: ImageInstance[] = list
    .filter(isFileObject)
    .map(Image)
    .filter(({ isImage }) => isImage);

  const fillAlts: ImagesInstance["fillAlts"] = (locale, defaultText) => {
    instances.map((image) => {
      image.fillAlt(locale, defaultText);
    });
  };

  const getImages: ImagesInstance["getImages"] = () =>
    instances.map((instance) => instance.image);

  return { instances, fillAlts, getImages };
};

export default Images;
