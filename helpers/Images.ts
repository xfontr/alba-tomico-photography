import type { ImageInstance, ImagesInstance } from "~/types/Image";

const Images = (list: ImageInstance[]): ImagesInstance => {
  const instances: ImageInstance[] = list.filter(({ isImage }) => isImage);

  const fillAlts: ImagesInstance["fillAlts"] = (locale, fallback) => {
    instances.forEach(({ fillAlt }) => {
      fillAlt(locale, fallback);
    });
  };

  const getImages: ImagesInstance["getImages"] = () =>
    instances.map(({ get }) => get()).sort((a, b) => a.index - b.index);

  return { instances, fillAlts, getImages };
};

export default Images;
