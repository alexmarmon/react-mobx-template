module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "semi": [2, "never"],
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "no-undef": 0,
    "no-unused-vars": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "comma-dangle": 0,
    "no-console": 0,
    "react/no-unused-state": 0,
    "no-unused-expressions": 0,
    "max-len": 0,
    "react/react-in-jsx-scope": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/prefer-stateless-function": 0,
    "jsx-a11y/alt-text": 0,
    "object-curly-newline": 0,
    "class-methods-use-this": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-nested-ternary": 0,
    "no-return-assign": 0,
    "react/sort-comp": 0
  },
  "env": {
    "browser": true,
    "node": true
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "config/webpack.config.dev.js"
      }
    }
  }
};
