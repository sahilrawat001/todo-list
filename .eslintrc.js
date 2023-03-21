module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-irregular-whitespace": 0,
        "semi": ["error", "always"],
        "no-const-assign": "error",
        "no-dupe-keys": "warn",
        "no-unreachable": "error",
        "camelcase": "error",
        "max-lines": ["error", 1000],
        "no-var": "error",
        "arrow-spacing": "error",
        "no-prototype-builtins": "off",
        "no-undef": "off",
        "no-cond-assign": "off",
        "no-constant-condition": "off"
    }
}
