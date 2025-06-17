import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    exclude: [...configDefaults.exclude, "dist/**/*"],
    coverage: {
      provider: "v8",
      exclude: [
        ...coverageConfigDefaults.exclude,
        "dist/**/*",
        "**/types/*",
        "**/configs/*",
        "**/*.config.ts",
      ],
      reporter: ["text", "html", "clover", "json", "lcov"],
    },
  },
});
