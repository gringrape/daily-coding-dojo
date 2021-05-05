module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  globals: {
    context: 'readonly',
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
  },
};
