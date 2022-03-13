module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  globals: {
    context: 'readonly',
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
  },
};
