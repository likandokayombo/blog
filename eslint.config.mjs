import antfu from "@antfu/eslint-config";
import next from "@next/eslint-plugin-next";

export default antfu(
  {
    type: "app",
    nextjs: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
      blockSpacing: true,
      braceStyle: "1tbs",
    },
  },
  {
    plugins: {
      next, // ✅ Fix: register the Next.js plugin
    },
    rules: {
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfigRootDir: ".",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],

      // Your spacing controls
      "no-multi-spaces": "error",
      "no-trailing-spaces": "error",

      "style/jsx-one-expression-per-line": "off",
    },
  },
);
