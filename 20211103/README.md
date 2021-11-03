# GraphQL API 만들기
출처: 웹, 앱 API 개발을 위한 graphQL http://www.yes24.com/Product/Goods/81537382

## Setup
### 프로젝트 시작  

```bash
npm init -y
```
### package 설치
```bash
npm install apollo-server graphql nodemon
```
nodemon watch

`package.json`:
```javascript
{ 
  // ...
  "scripts": {
    "start": "nodemon --ext js,json,graphql"
  },
  // ...
}
```

nodemon 참고: https://github.com/remy/nodemon#specifying-extension-watch-list
> #### Specifying extension watch list
>
>By default, nodemon looks for files with the .js, .mjs, .coffee, .litcoffee, and .json extensions. If you use the --exec option and monitor app.py nodemon will monitor files with the extension of .py. However, you can specify your own list with the -e (or --ext) switch like so

### hello world
`src/index.js`:
```javascript
console.log('hello world');
```

```bash
npm start
```

### ESLint
```bash
npm install eslint
npx eslint --init
```

eslint config

> ✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · node
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript

### Jest
```bash
npm install jest
npm install --save-dev @types/jest
```

`package.json`:
```json
{
  // ...
  "scripts": {
    // ...
    "test": "jest",
    "watch": "npm test -- --watchAll"
  },
  // ...
}
```

### ESModule
- Determining module system: https://nodejs.org/api/packages.html#determining-module-system

`package.json`:
```json
{
  // ...
  "type": "module",
  // ...
}
```

babel-jest

```bash
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

`jest.config.cjs`:
```javascript
module.exports = {
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
};
```

`babel.config.cjs`: 
```javascript
module.exports = {
  presets: [
    [
      '@babel/preset-env', 
      {targets: {node: 'current'}}
    ]
  ],
};
```