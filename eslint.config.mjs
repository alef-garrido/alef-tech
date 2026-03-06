import js from "@eslint/js";
import typescript from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import react from "eslint-plugin-react";

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  js.configs.recommended,
  ...typescript.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "@next/next": nextPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      ...react.configs["jsx-runtime"].rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
