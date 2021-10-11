## Grading students
Problem: https://www.hackerrank.com/challenges/grading/problem

### procedure
- [x] 점수 하나에 대한 변환함수(round5)  만들기
	- [x] 여러줄 입력
	- [x] 함수 타입
	- [x] 반올림(변환 조건)
	- [x] 변환 조건 (guard ?)
- [x] 입력을 해석하기 
- [x] 해석 결과에 변환함수를 적용하기
- [x] 출력하기

### 여러줄의 함수 선언 (ghci)
```haskell
:{
fun :: Int -> Int
fun x
  | x > 10 = x + 5
	| otherwise = x * 5
:}
```

### 변환함수
- 점수가 38 이상일때는 변환이 일어남.
- 변환은, 바로 다음 5 의 배수로 반올림 하는 것.
- 단, 바로 다음 5의 배수와의 차이가 3 보다 작을 경우.

### screen clear(ghci)
```bash
:! clear
```

### 변환함수 만들기
- 바로 다음 5 의 배수.
- 입력 숫자의 범위에 따라 변환 여부 결정.

```haskell
:{
round5 :: Int -> Int
round5 x
  | x >= 38 && (m5 - x) < 3 = m5
  | otherwise = x
  where m5 = x - x `mod` 5 + 5
:}
```

