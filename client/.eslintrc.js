module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  ignorePatterns: ["node_modules/", "config/", "public/", "scripts/"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".ts", ".jsx", ".tsx"] }
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ]
  }
};
