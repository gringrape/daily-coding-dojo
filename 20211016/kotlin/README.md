# Kotlin 
## installation
sdkman 활용 - https://sdkman.io/
```bash
sdk list kotlin
sdk install kotlin {version}
```
## project
```bash
gradle init
```

# 없는 숫자 더하기 - 프로그래머스
link: https://programmers.co.kr/learn/courses/30/lessons/86051

## 구하는 것
numbers 에 없는 수를 모두 더한 값.

## 주어진 것
0 부터 9 까지의 수 중 일부가 들어있는 배열 numbers

## 조건
numbers 에 있는 숫자들은 모두 서로 다릅니다

## 계획
0 ~ 9 까지의 수를 모두 가지고 있는 배열.
위 배열에서 numbers 에 있는 것을 제외한다. 
- [x] 0 ~ 9 까지의 배열
- [x] numbers 에 포함된다?
- [x] 포함된 것을 제외

## Kotlin reference
- range https://kotlinlang.org/docs/ranges.html#range
- intArrayOf https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/int-array-of.html
- filterNot https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/filter-not.html
