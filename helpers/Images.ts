import type { ImageInstance, ImagesInstance } from "~/types/Image";

const Images = (list: ImageInstance[]): ImagesInstance => {
  const instances: ImageInstance[] = list.filter(({ isImage }) => isImage);

  const fillAlts: ImagesInstance["fillAlts"] = (locale, fallback) => {
    instances.forEach(({ fillAlt }) => {
      fillAlt(locale, fallback);
    });
  };

  const getImages: ImagesInstance["getImages"] = () =>
    instances.map(({ image }) => image);

  return { instances, fillAlts, getImages };
};

export default Images;
