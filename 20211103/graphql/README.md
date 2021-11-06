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

## Resolver
특정 필드의 데이터를 반환하는 함수.
간단한 스키마를 구성해서 리졸버를 테스트해 볼 수 있다.

참고: https://www.npmjs.com/package/graphql

### 스키마
`typeDefs.js`:
```javascript
const typeDefs = `
  type Query {
    totalPhotos: Int!
  }
`;
```
루트 타입 Query 아래에 totalPhotos 필드가 필수 Int 속성으로 선언되어 있다.

### 리졸버
Query 루트타입에 맞는 리졸버 객체로 지정할 수 있다.
`resolvers.js`:
```javascript
const resolvers = {
  Query: {
    totalPhotos: () => 42,
  },
};
```

## Mutation 루트 타입 추가하기
위의 예시처럼 사진(photos)을 주요 모델로 설정하고,  
새로운 사진을 추가하는 Mutation 리졸버를 만들어보자.  
테스트를 위해 독립적으로 photo 를 저장할 객체가 필요하다.  
기존의 리졸버도 변경해야하므로, 할 일 목록을 만들어보자. 

### 1. 사용자는 사진의 개수를 알 수 있다.  
- [x] 사진 데이터 분리
- [x] 사진 개수를 반환하도록 리졸버 구현

### 2. 사용자는 사진을 추가할 수 있다.
- [x] 사진을 추가하도록 스키마 변경
- [x] 사진을 추가하도록 리졸버 구현

### 사진 데이터 분리
사진 데이터를 별도의 모듈로 만들어주자. 
`photos.js`:
```javascript
const photos = [];

export default photos;
```

### 사진 개수를 반환하도록 리졸버 구현
테스트에서 모킹을 통해 사진 배열을 임의로 만들어주고,
사진 개수를 반환하는 리졸버를 테스트 해보자.

`resolvers.test.js`:
```javascript
jest.mock('./photos.js', () => []);

describe('resolver', () => {
  // ...

  beforeEach(() => {
    photos.splice(0, photos.length);
  });

  it('resolves query', async () => {
    photos.push(1, 2, 3);

    const data = await execute({
      resolvers: rootResolvers.Query,
      query: `{ 
        totalPhotos 
      }`,
    });

    expect(data.totalPhotos).toBe(3);
  });
});
```

테스트를 통과하도록 구현을 추가한다

`resolvers.test.js`:
```javascript
const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
  },
};
```

context 를 사용해서 테스트를 리팩토링하자.
```bash
npm install --save-dev jest-plugin-context
```

`resolvers.test.js`:
```javascript
  context('photos with length 3', () => {
    beforeEach(() => {
      photos.push(1, 2, 3);
    });

    it('resolves photo length', async () => {
      const data = await execute({
        resolvers: rootResolvers.Query,
        query: `{ 
          totalPhotos 
        }`,
      });

      expect(data.totalPhotos).toBe(3);
    });
  });
```

### 사진을 추가
스키마를 변경한다
`typeDefs.js`:
```javascript
const typeDefs = `
  ${/* ... */}
  type Mutation {
    postPhoto(name: String! description: String): Boolean!
  }
`;
```
리졸버를 추가해준다.
`resolvers.js`:
```javascript
const resolvers = {
  // ...
  Mutation: {
    postPhoto(parent, args) {
      photos.push(args);
      return true;
    }
  }
}
```

## 문제점
- 사진의 필드가 비어진 상태로 입력된다. -> apollo 와 graphql 인터페이스가 조금 다른 것 같다.
