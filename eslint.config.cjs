// eslint.config.cjs
const js = require("@eslint/js");
const pluginPrettier = require("eslint-plugin-prettier");
const configPrettier = require("eslint-config-prettier");

module.exports = [
  {
    ignores: ["node_modules"],
  },
  {
    // Cho mọi file .js
    files: ["**/*.js"],
    languageOptions: {
      // Code Node/JS cũ => CommonJS
      sourceType: "commonjs",
      ecmaVersion: "latest",

      // Khai báo globals (Node) để ESLint không báo no-undef
      globals: {
        console: "readonly",
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly"
      }
    },

    // Kích hoạt plugin Prettier
    plugins: {
      prettier: pluginPrettier
    },

    // Gộp rule ESLint recommended + config Prettier
    rules: {
      ...js.configs.recommended.rules,
      ...configPrettier.rules,

      // Bật rule "prettier/prettier"
      "prettier/prettier": "error"
    }
  }
];
