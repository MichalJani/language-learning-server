module.exports = {
    "env": {
        "es2020": true,
        "node": true
    },
    "extends": [
        "google"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "new-cap": "off",
        "max-len": "off",
        "require-jsdoc": "off",
        "arrow-parens": "off"
    }
};
