import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["node_modules/**", "dist/**", "build/**"]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
    ignores: ["node_modules/**", "dist/**", "build/**"]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
    ignores: ["node_modules/**", "dist/**", "build/**"]
  },
  tseslint.configs.recommended
]);
