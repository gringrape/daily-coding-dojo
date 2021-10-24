# React context + reducer
context + useReducer hook 을 통한 규모 있는 어플리케이션의 상태관리. 

https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context
## 목표
다음과 같은 TODO List 를 만들기
![작업목표](https://user-images.githubusercontent.com/53764714/138556019-e6afec4a-0092-49ce-a337-6cc8a4893d09.png)
## CheckList
- [x] 할 일 (Task) 표시하기
- [x] 할 일들 표시하기
  - [x] 할 일들이 block 으로 표시되면 좋겠다
- [x] 할 일 추가하기
  - [x] tasksReducer
  - [x] addTask action
  - [x] addTask reducer
  - [x] 입력 화면
  - [x] 할 일이 추가된다!
  - [x] 할 일 추가 후 입력 지워지기
  - [x] 공백 일때 할 일 입려되지 않게 하기
- [x] 할 일 완료하기
  - [x] 할 일에 완료표시하기
  - [x] 체크박스를 누르면 완료되게 하기'
    - [x] tasksReducer - setCompleteTask
- [x] 할 일 삭제하기
  - [x] 삭제하기 버튼 표시
  - [x] 버튼을 누르면 삭제
    - [x] tasksReducer - deleteTask

## ESLint rule 추가
### label - input 연결
`.eslintrc.js` 파일:
```js
{
	// ...
	rules: {
		// ...
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'jsx-a11y/label-has-for': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
	}
}
```
## Jest Mock Function + TypeScript
jest 를 이용해 모킹한 함수(jest.fn())의 타입은 다음과 같이 설정해 줄 수 있다.
`context/__mocks__/TaskContext.ts` 파일:
```typescript
export const useTasksDispatch = jest.fn();
```
테스트 대상 컴포넌트:
```typescript
// ...(전략)...
const mockedUseTasksDispatch = useTasksDispatch as jest.MockedFunction<typeof useTasksDispatch>;
// ...(중략)...
describe('TodoList', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    mockedUseTasksDispatch.mockReturnValue(dispatch);
  });
// ...(후략)...
```

See https://jestjs.io/docs/mock-function-api#jestmockedfunction

## jest-plugin-context
상황을 명확하게 드러내주기 위해서, context 를 활용 가능한 라이브러리 설치.
```bash
npm install --save-dev jest-plugin-context @types/jest-plugin-context 
```

`jest.config.js` 파일:
```javascript
module.exports = {
  // ...(전략)...
  setupFiles: [
    "jest-plugin-context/setup"
  ]
  // ...(후략)...
}
```

`.eslintrc.js` 파일:
```javascript
module.exports = {
  // ...(전략)...
  globals: {
    context: 'readonly',
  },
  // ...(후략)...
}
```

See: https://www.npmjs.com/package/jest-plugin-context/v/2.7.0
See: https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals

## 취소선 표시하기
css:
```css
target {
  text-decoration: line-through;
}
```