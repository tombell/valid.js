module.exports = {
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "prettier",
    "plugin:vitest/recommended",
  ],
  parserOptions: {
    project: ["./tsconfig.lint.json"],
  },
};
