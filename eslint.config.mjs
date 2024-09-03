import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {ignores: ["node_modules", ".next", ".yarn", "stories",".prettierrc.js", "jest.config.js", "next.config.mjs", "tsconfig.json", "babel.config.js"]},
  {languageOptions: { globals: globals.browser }},
  {rules: { 
    "no-console": "warn", 
    "react/react-in-jsx-scope": "off",
   }},
  {settings: { react: { version: "detect" }}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];