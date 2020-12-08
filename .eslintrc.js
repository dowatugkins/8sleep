module.exports = {
  "plugins": ["react"],
  "extends": ["eslint:recommended", "plugin:react/recommended"],

  "parser": "babel-eslint",

  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },

  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },

  "env": {
    "es6": true,
    "node": true
  },

  "globals": {
    "__DEV__": true,
    "fetch": true,
    "FormData": true
  },

  // Specific rule settings, "extends" has brought in its own rules.
  // These rules take precendence over extended rules.
  // First numeric value translations: { 0: 'off', 1: 'warn', 2: 'error' }.
  "rules": {
    "react/sort-comp": 0,
    "react/no-did-update-set-state": 0,
    "arrow-body-style": 0,
    "prefer-template": 0,
    "class-methods-use-this": 0,
    "consistent-this": 1,
    "function-paren-newline": 0,
    "import/first": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/anchor-is-valid": 0, // Once we upgrade to react 16.1.0 we can remove this.
    "lines-between-class-members": ["error", "always"],
    "max-len": [1, 200, 2],
    "new-cap": 0,
    "no-console": 1,
    "no-else-return": 1,
    "no-extra-bind": 1,
    "no-fallthrough": 2,
    "no-loop-func": 2,
    "no-mixed-spaces-and-tabs": 1,
    "no-return-assign": 0,
    "no-use-before-define": 0,
    "no-var": 2,
    "object-curly-newline": 0,
    "padded-blocks": ["error", "never"],
    "quotes": [0, "single", { "avoidEscape": true }],
    "radix": 1,
    "react/forbid-prop-types": 0,
    "react/jsx-closing-tag-location": 0, // TODO: look into implementing later
    "react/jsx-filename-extension": 0,
    "react/jsx-wrap-multilines": 0, // TODO: look into implementing later
    "react/no-string-refs": 0,
    "react/no-typos": 0, // TODO: look into implementing later
    "react/prefer-stateless-function": 0,
    "semi": 2,
    "semi-spacing": 1,
    "yoda": 0
    // "react-hooks/exhaustive-deps": 0
  }
};
