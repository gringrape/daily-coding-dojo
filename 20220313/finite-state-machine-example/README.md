# 프로젝트 구성
```bash
npm init -y

npm install --save-dev jest @types/jest@swc/core @swc/jest regenerator-runtime

```

swc/jest 설정 참고: https://github.com/swc-project/jest

`jest.config.js`:
```javascript
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        target: 'es2021'
      },
    }],
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
}
```

eslint 설정
```
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · node
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
```




