import type ImageKit from "imagekit";
import type { Path } from "~/types/Path";

const api = (imageKit: ImageKit) => {
  const getPath = (path: Path) => imageKit.listFiles({ path });

  const getFolders = (path: Path) =>
    imageKit.listFiles({
      includeFolder: true,
      fileType: "non-image",
      path,
    });

  return {
    getPath,
    getFolders,
  };
};

export default api;
