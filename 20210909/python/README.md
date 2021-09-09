# 복서 정렬하기
https://programmers.co.kr/learn/courses/30/lessons/85002

## 구하는 것
- 정렬된 복서 선수들의 번호

## 주어진 것
- 선수들의 몸무게 배열 - weight
- 선수들의 전적 - head2head

## 조건
### 정렬하는 방법
- 승률 DESC
- 몸무게가 자신 보다 무거운 복서를 이긴 회수 DESC
- 몸무게 DESC
- 번호 ASC

## 체크리스트
### win rate
- [x] ["NL", "WN"], 1 => 0
- [x] ["NNN", "NNN", "NNN"] => 0
### wins over heavy
- [x] wins over heavier
### sort
- [x] sample

## 망설였던 지점들
- 승리횟수와 패배횟수 계산의 중복을 제거하기
- division by zero 를 깔끔하게 해결하기
- 여러가지 기준을 적용해서 정렬하기 