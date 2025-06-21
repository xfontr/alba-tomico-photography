import type { Path } from "~/types/Path";
import api from "../api";
import type ImageKit from "imagekit";

const mockListFiles = vi.fn();
const mockImageKit = { listFiles: mockListFiles } as unknown as ImageKit;

describe("api", () => {
  const path: Path = "some/path";

  const { getPath, getFolders } = api(mockImageKit);

  it("should call listFiles with just the path when getPath is used", () => {
    getPath(path);

    expect(mockListFiles).toHaveBeenCalledWith({ path });
  });

  it("should call listFiles with folder params when getFolders is used", () => {
    getFolders(path);

    expect(mockListFiles).toHaveBeenCalledWith({
      path,
      includeFolder: true,
      fileType: "non-image",
    });
  });
});
