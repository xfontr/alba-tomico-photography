import { describe, it, expect, vi, beforeEach } from "vitest";
import type {
  ListFileResponse,
  FileObject,
} from "imagekit/dist/libs/interfaces";
import images from "../images";
import { DEFAULT_LOCALE, FRONTAL_IMAGE } from "../../configs/constants";

vi.mock("vue-i18n", () => ({
  useI18n: () => ({
    t: vi.fn().mockReturnValue("Default alt"),
  }),
}));

describe("images", () => {
  const locale = "es";
  const { getImage, getImagesFromList } = images(locale);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return undefined if fileType is not image", () => {
    const file = {
      fileType: "non-image",
    } as FileObject;

    const result = getImage(file);
    expect(result).toBeUndefined();
  });

  it("should return image with localized alt text and front tag", () => {
    const file = {
      fileType: "image",
      url: "https://cdn/image.jpg",
      tags: [FRONTAL_IMAGE],
      filePath: "posts/my-post/image.jpg",
      customMetadata: {
        es: "Alt en español",
        en: "Alt in English",
      },
    };

    const result = getImage(file as unknown as FileObject);

    expect(result).toEqual({
      alt: "Alt en español",
      src: "https://cdn/image.jpg",
      front: true,
      post: "posts/my-post",
    });
  });

  it("should fallback to default locale alt if current one missing", () => {
    const file = {
      fileType: "image",
      url: "https://cdn/image.jpg",
      filePath: "a/b/c.jpg",
      customMetadata: {
        [DEFAULT_LOCALE]: "Fallback alt",
      },
    };

    const result = getImage(file as FileObject);
    expect(result?.alt).toBe("Fallback alt");
  });

  it("should extract multiple images from list", () => {
    const list = [
      {
        fileType: "image",
        url: "https://cdn/1.jpg",
        filePath: "a/1.jpg",
        customMetadata: { es: "Uno" },
      },
      {
        fileType: "non-image",
        url: "https://cdn/2.jpg",
        filePath: "a/2.jpg",
      },
      {
        fileType: "image",
        url: "https://cdn/3.jpg",
        filePath: "a/3.jpg",
        customMetadata: {},
      },
    ];

    const result = getImagesFromList(list as ListFileResponse);
    expect(result.length).toBe(2);
    expect(result[0].src).toBe("https://cdn/1.jpg");
    expect(result[1].src).toBe("https://cdn/3.jpg");
  });
});
