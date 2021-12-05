# 간단 계산기 만들기

![demo](https://user-images.githubusercontent.com/14071105/83361577-0cfccb80-a3c5-11ea-8313-8b9aaf2de4e5.gif)

## 구현할 기능들

* 숫자를 누르면 누른 숫자가 출력되어야 합니다.
* 숫자를 연속해서 누르면 숫자가 더해져서 출력되어야 합니다.
* 숫자와 연산자를 입력한 후 `=`를 클릭하면 계산 결과가 출력되어야 합니다.
* 연속해서 숫자와 연산자를 입력하면 중간에 계산 결과가 출력되어야 합니다.



## 모델링

### 키워드

- 연산자

- 숫자 -> 피연산자

- 계산

### 유즈케이스

- `피연산자`를 입력받는다

- `연산자`를 입력받는다

- `수식`을 `계산`한다

- `계산`결과를 출력한다

## 예시

>  1 + 2 = 3

- 수식: `1 + 2`

- 연산자: `+`

- 피연산자: `1`, `2`

- 수식을 계산한다: `=`



## 작업 기록

라이브러리 설치: `npm install`

작동확인: `npm start`

테스트 환경 구성:

```bash
npm install --save-dev @types/jest @testing-library/jest-dom \
@testing-library/dom
```

`jest.config.js`:

```javascript
module.exports = {
    testEnvironment: 'jsdom'
}
```
