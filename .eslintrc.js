module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true,
                "jest/globals": true
            },
            "files": [
                ".eslintrc.{js,cjs}",
                "tests/**/*"
            ],
            "parserOptions": {
                "sourceType": "script"
            },
            "plugins": ["jest"],
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
    }
}
