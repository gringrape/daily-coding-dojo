# 줄 서는 방법
https://programmers.co.kr/learn/courses/30/lessons/12936
## 구하는 것
사람을 나열하는 방법을 사전 순으로 정렬했을때, k 번째 방법
## 주어진 것
- 사람의 수 n
- 방법의 순서 k
## 착안
처음에는 factorial 을 이용해서 k 번째를 직접찾았다. 
시간 초과가 발생해서 꼭 필요한것만 조사가 필요함을 알았다. 

사전식 배열이라고 해서 검색을 효율적으로 하기 위한 인덱스를 떠올렸다.
k 가 속해있는 곳을 인덱스를 근거로 찾아가면 되겠다는 판단이 들었다. 