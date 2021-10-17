# 모두 0 으로 만들기
https://programmers.co.kr/learn/courses/30/lessons/76503?language=python3

## 구하는 것
'트리'의 모든 '점'들의 '가중치'를 0으로 만드는 최소 '행동' 횟수
(만들 수 없으면 -1)

## 주어진 것
- 트리 각점의 가중치 배열 a
- 간선정보 edges

## 계획
### '간선'의 '가중치'와 '방향' 을 결정
- 행동을 최소화 해야하므로, 하나의 간선이 두방향으로 쓰이지 않음.
(+1, -1), (-1, +1) 의 순 효과는 0 이므로.
- 하나의 간선은 하나의 방향만을 가짐.
- 행동의 횟수를 간선의 '가중치'로 생각 가능.
- 식이 n 개, 미지수가 n - 1 개를 갖는 연립방정식 풀이.