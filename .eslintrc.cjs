module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "vite.config.ts",
    "cypress.config.ts",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["react-refresh", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all",
      },
    ],
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
