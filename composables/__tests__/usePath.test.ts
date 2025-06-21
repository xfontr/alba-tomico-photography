import type { Mock } from "vitest";
import { useRoute } from "vue-router";
import { VALID_PATHS } from "../../configs/constants";
import usePath from "../usePath";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
}));

const mockRoute = (path: string) => {
  (useRoute as unknown as Mock).mockReturnValue({ path });
};

describe("usePath", () => {
  it("should extract current path without slashes", () => {
    mockRoute("/works");

    const { current } = usePath();

    expect(current.value).toBe("works");
  });

  it("should validate a path if it's in VALID_PATHS", () => {
    const validPath = `/${VALID_PATHS[0]}`;
    mockRoute(validPath);

    const { isValid } = usePath();

    expect(isValid.value).toBe(true);
  });

  it("should invalidate a path if it's not in VALID_PATHS", () => {
    mockRoute("/some-weird-page");

    const { isValid } = usePath();

    expect(isValid.value).toBe(false);
  });
});
