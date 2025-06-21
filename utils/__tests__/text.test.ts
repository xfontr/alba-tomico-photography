import { addBrackets } from "../text";

describe("addBrackets", () => {
  it("should wrap a string in brackets with spaces", () => {
    const input = "hello";

    const result = addBrackets(input);

    expect(result).toBe("[ hello ]");
  });

  it("should work with empty string", () => {
    const input = "";

    const result = addBrackets(input);

    expect(result).toBe("[  ]");
  });

  it("should work with special characters", () => {
    const input = "!@#";

    const result = addBrackets(input);

    expect(result).toBe("[ !@# ]");
  });

  it("should preserve whitespace inside string", () => {
    const input = " a b ";

    const result = addBrackets(input);

    expect(result).toBe("[  a b  ]");
  });
});
