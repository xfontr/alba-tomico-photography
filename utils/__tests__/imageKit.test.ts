import ImageKit from "imagekit";
import { imageKit } from "../imageKit";

vi.mock("imagekit");

const config = {
  publicKey: "test_public_key",
  privateKey: "test_private_key",
  baseUrl: "https://ik.imagekit.io",
  id: "user123",
};

describe("imageKit", () => {
  it("should initialize ImageKit with correct config", () => {
    imageKit(config);

    expect(ImageKit).toHaveBeenCalledWith({
      publicKey: "test_public_key",
      privateKey: "test_private_key",
      urlEndpoint: "https://ik.imagekit.io/user123/",
    });
  });
});
