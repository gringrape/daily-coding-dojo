# 여러개의 시간 구간이 있을때, 겹치는지 여부를 알아내기
## 구하는 것
여러개의 시간 구간이 `겹치는지 여부`를 알아내기
## 주어진 것
여러개의 `시간 구간`
e.g.)
```json
{
  "startTime": "11:00",
  "endTime": "12:00"
}
```
## 접근
### incremental 접근 + 계획
- 두개의 시간 구간을 비교
- 여러개의 시간 구간에서 두개를 선택하는 모든 경우
- 시간(e.g. 11:00) 두개가 있을때, 어떤 시간이 앞에 있는 것인지 확인

## 두개의 시간 구간이 겹치는지 간단하게 확인 하기
안 겹치는 경우를 생각
```
range1 = (s1, e1)
range2 = (s2, e2)

e1 <= s2 or e2 <= s1
```
두 구간의 관계는 겹치는가 안겹치는가 두가지가 모순되지 않게 존재하므로,
다음과 같은 조건식을 사용하면 된다.
```
e1 > s2 and e2 > s1
```