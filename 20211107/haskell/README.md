# Apples and Oranges
https://www.hackerrank.com/challenges/apple-and-orange/problem

## 구하는 것
집에 떨어진 사과와 오렌지의 개수 배열

## 주어진 것
- 집의 좌표 범위
- 사과, 오렌지 나무의 좌표
- 사과와 오렌지들이 나무로 부터 떨어진 상대 좌표

## 계획
- 절대좌표 구하기: 나무의 좌표와 과일(사과, 오렌지)의 상대 좌표를 더한다.
- 절대좌표가 집의 영역안에 들어오는 과일 개수 구하기. 

## Pattern matching
binding internal value of a data structure to variable.

```haskell
let [a, _, b, _] = [1, 2, 3, 4] -- a = 1, b = 3
```

길이에 관계없이,

```haskell
let (a:_) = [1, 2, 3, 4]
```

머리와 꼬리,

```haskell
let (h:t) = [1, 2, 3, 4]
let (h1:h2:t) = [1, 2, 3, 4, 5]
```

## 집안에 떨어진 사과의 개수 구하기
사과의 절대좌표 배열이 주어졌다고 할때,
```haskell
apples = [1, 2, 3]
count = length $ filter (\x -> x >= s && x <= t) $ map (\x -> x + a) $ apples
```