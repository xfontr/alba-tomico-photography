import type { ListFileResponse } from "imagekit/dist/libs/interfaces";
import entries from "../entries";

describe("entries", () => {
  const { getEntries } = entries();

  it("should return only folder entries mapped to Entry shape", () => {
    const mockList = [
      {
        type: "file",
        name: "image.jpg",
        folderPath: "/images",
      },
      {
        type: "folder",
        name: "gallery",
        folderPath: "/collections",
      },
      {
        type: "folder",
        name: "archive",
        folderPath: "/old",
      },
    ];

    const result = getEntries(mockList as ListFileResponse);

    expect(result).toEqual([
      { name: "gallery", path: "/collections" },
      { name: "archive", path: "/old" },
    ]);
  });
});
