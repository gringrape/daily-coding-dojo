module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  globals: {
    given: 'readonly',
    context: 'readonly',
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
  },
};
