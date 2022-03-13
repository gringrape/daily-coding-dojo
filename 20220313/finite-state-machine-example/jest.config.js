module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        target: 'es2021',
      },
    }],
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
};
