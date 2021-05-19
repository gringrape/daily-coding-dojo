# 실패율
https://programmers.co.kr/learn/courses/30/lessons/42889
## 구하는 것
스테이지 번호 배열 (실패율 내림차순)
## 주어진 것
- 전체 스테이지 개수
- 게임을 이용하는 사용자가 `현재 멈춰있는` 스테이지 번호 배열
## 조건
### 실패율
해당 스테이지에서 멈춰있는 플레이어수 / 스테이지에 도달한 플레이어의 수

## 배운것
### Java - Comparator, Comparable
정렬을 하기 위해서는 정렬 기준이 필요하다.
정렬 기준 로직을 전달하기 위해서 Comparator, Comparable 인터페이스를 활용한다. 

Comparable 인터페이스를 활용한 객체는, 
compareTo 라는 메서드를 구현할 필요가 있다.

compareTo 의 결과는
- 양수 이거나
- 0 과 같거나
- 0 보다 작거나
할 수 있다. 

각각의 값에 따라서 비교하는 두 숫자의 순서를 결정한다. 