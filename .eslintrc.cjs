export default {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: 2022,
    },
    env: {
        node: true,
        es2021: true,
    },
    plugins: ["@typescript-eslint", "eslint-plugin-import", "prettier", "import"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
    ],
    rules: {
        "prettier/prettier": "error",
        // ensure you never accidentally use require():
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "import/order": [
            "warn",
            {
                groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
                "newlines-between": "always",
            },
        ],
    },
    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json",
            },
            node: {
                extensions: [".ts", ".js", ".json"],
            },
        },
    },
};
