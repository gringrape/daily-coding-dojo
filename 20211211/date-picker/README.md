# React + TypeScript + Parcel
이 실습은 다음 예제를 참고하였습니다. 
-> https://github.com/ahastudio/CodingLife/tree/main/20211008/react

## NPM 프로젝트 생성
```bash
npm init -y
```

## TypeScript 세팅
```bash
npm i -save-dev typescript
npx tsc --init
```

`tsconfig.json` 파일의 옵션 수정:
```bash
{
	"compilerOptions": {
		// ...(전략)...
		"jsx": "react-jsx",
		// ...(후략)...
	}
}
```

"jsx" 옵션은 tsx 가 emit 된 결과물을 설정할 수 있다.
"react-jsx" 를 택하는 경우, React.createElement 로 변환되게 된다. 
"preserve" 를 택한다면, jsx 를 변환하지 않아서, 추가적으로 babel 과 같은
도구를 이용하게 된다. 

See https://www.typescriptlang.org/docs/handbook/jsx.html#basic-usage

`package.json` 파일에 `check` 명령 추가:
```bash
{
	"scripts": {
		"check": "tsc --noEmit"
	}
}
```
파일 변환(emit) 없이 컴파일만 수행하는 옵션

TypeScript 컴파일 검사:
```bash
npm run check
```
## ESLint 세팅
```bash
npm i --save-dev eslint
npx eslint --init
```

```txt
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · JavaScript
✔ Would you like to install them now with npm? · No / Yes
```

`package.json` 파일에 `lint` 명령 추가:
```json
{
	"scripts": {
		// ...(전략)...
		"lint": "eslint --fix --ext .js,.jsx,.ts,.tsx src"
		}
}
```

Lint and fix all:
```bash
npm run lint
```

## React 설치
```bash
npm install react react-dom
npm install --save-dev @types/react @types/react-dom
```
### React 기본코드 작성
```bash
mkdir src
touch src/index.tsx
touch src/App.tsx
```

linux command 참고:
> - cat command: It is used to create the file with content.
- touch command: It is used to create a file without any content. The file created using touch command is empty. This command can be used when the user doesn’t have data to store at the time of file creation.

`src/App.tsx` 파일:
```javascript
export default function App() {
	return (
		<p>Hello, world!</p>
	);
}
```

`src/index.tsx` 파일:
```javascript
import * as ReactDOM from 'react-dom';

import App from './App';

const container = document.getElementById('app');
ReactDOM.render(<App />, container);
```

## Jest 세팅
```bash
npm install --save-dev jest ts-jest @types/jest \
@testing-library/react @testing-library/jest-dom
```

`jest.config.js` 파일 작성:
```javascript
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: [
		'@testing-library/jest-dom/extend-expect',
	],
	testPathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/dist/',
	],
};
```

### 참고 - ts-jest
ts-jest 는 code transformation 을 위한 도구이다.
jest 는 project 코드를 Node.js 에서 지원하는 JavaScript 코드로
읽기 때문에, 다른 형식의 코드 작성시 변환이 필요하다.

> Jest runs the code in your project as JavaScript, but if you use some syntax not supported by Node.js out of the box (such as JSX, types from TypeScript, Vue templates etc.) then you'll need to transform that code into plain JavaScript, similar to what you would do when building for browsers.

기본적으로 jest 에서는 babel 을 transpiler 로 사용하지만, 
`transform` 옵션을 통해서 별도로 지정이 가능하다.

ts-jest 의 documentation 을 보면, babel 에 비해 ts-jest 가 갖는
장점들을 소개하고 있다. 

See https://jestjs.io/docs/code-transformation
See also https://kulshekhar.github.io/ts-jest/docs/babel7-or-ts

### 참고 - preset
jest 설정의 base 가 되는 npm module 을 지정할 수 있는 옵션이다.  
https://kulshekhar.github.io/ts-jest/docs/getting-started/presets

### 참고 - testPathIgnorePatterns
특정 경로의 테스트가 나오면 skip 할 수 있게 해주는 옵션.
정규표현식 문자열의 배열이다. full path 를 필요로 하기 때문에 <rootDir> 를 이용해서
프로젝트 루트를 넣어준다. 
https://jestjs.io/docs/configuration#testpathignorepatterns-arraystring

### `.eslint.rc` 파일에 설정추가
```javascript
module.exports = {
	env: {
		// ...(전략)... 
		jest: true,
	}
	// ...(후략)...
}
```

### `src/App.test.tsx` 에 테스트 추가
```typescript
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders greeting message', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('Hello, world!');
  });
});
```

### `package.json` 파일에 `test`, `watch` 명령 추가
```json
{
	"scripts": {
		// ...(전략)...
		"test": "jest",
		"watch": "npm test -- --watchAll",
	}
}
```
Run tests:
```bash
npm test
```

## Parcel 설치
```bash
npm install --save-dev parcel
```

`package.json` 파일에 `start` 명령 추가:
```json
{
	"scripts": {
		"start": "parcel index.html --port 8080",
		// ...(후략)...
	}
}
```

`.gitignore` 내용 추가:
```txt
/.parcel-cache/
/dist/
```

`index.html` 파일 작성:
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Sample</title>
</head>
<body>
  <div id="app">
    Loading...
  </div>
  <script type="module" src="./src/index.tsx"></script>
</body>
</html>
```
