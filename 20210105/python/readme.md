# 문제 
두개 뽑아서 더하기
## 분석
- 입력 - 정수 배열
- 출력 - 서로 다른 인덱스에 있는 두개의 수를 뽑아 더해서 만들 수 있는 모든 수
- 조건 - 출력, 오름차순
## 반성
### 무엇을 배웠나
- sorted, sort => sort 반환값 없음
- itertools, combination
- list comprehension 활용 - https://docs.python.org/3/howto/functional.html#generator-expressions-and-list-comprehensions
- set 의 literal 활용 {}
- pytest, pytest-watch

# 문제
124 나라의 숫자
https://programmers.co.kr/learn/courses/30/lessons/12899
## 분석
입력 - 자연수 n  
출력 - n 을 124 나라에서 사용하는 숫자로 바꾼 값  
## 계획
3 진법이 떠오른다
### 잘한 것
3 진법으로 깔끔하게 풀렸다.
### 못한 것
중복을 제거하지 못했다  
불필요한 선언을 했다  
divmod 를 사용하면 몫과 나머지를 깔끔하게 구할 수 있다.  

# 문제
튜플
https://programmers.co.kr/learn/courses/30/lessons/64065
## 분석
입력 - 특정 튜플을 표현하는 집합이 담긴 문자열  
출력 - 문자열이 표현하는 튜플  
### 조건
집합은 순서가 바뀌어도 된다  
튜플은 순서가 바뀌면 안된다  
## 반성
통과하기 - 의미를 드러내기 - 중복을 제거하기 기술을 적용해보도록 하자  
collections 의 Counter 를 배웠다 -> 갯수를 세서 dictionary 형태로 반환한다.  
이외에도 collections 에 적용할 만한 것들이 있다는 것을 생각해두자.  
