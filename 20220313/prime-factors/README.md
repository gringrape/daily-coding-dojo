# Prime factors
## 요구사항 정리
숫자가 주어지면, 해당 숫자의 1 을 제외한 소인수를 오름차순으로 나열한다.
- 2 미만의 숫자 -> 빈 리스트
- 2 이상의 소수 -> 자기 자신
- 2 이상의 합성수 -> 소인수배열

## 용어 정리
- 소인수 - prime factor
- 소수 - prime number
- 합성수 - composite number

### 풀이 코드
```java
class PrimeFactorsTest {
    private int smallestPrimeFactor(int number) {
        return IntStream.rangeClosed(2, (int) Math.sqrt(number))
                .filter(i -> number % i == 0)
                .findFirst()
                .orElse(number);
    }

    private IntStream primeFactorStream(int number) {
        if (number < 2) {
            return IntStream.empty();
        }

        int smallestPrimeFactor = smallestPrimeFactor(number);
        if (smallestPrimeFactor == number) {
            return IntStream.of(number);
        }

        return IntStream.concat(
                IntStream.of(smallestPrimeFactor),
                primeFactorStream(number / smallestPrimeFactor)
        );
    }

    private int[] primeFactors(int number) {
        return primeFactorStream(number).toArray();
    }
    
    @Test
    void testLowerThanBoundaryReturnsEmptyList() {
        assertThat(primeFactors(1)).isEqualTo(new int[]{});
        assertThat(primeFactors(0)).isEqualTo(new int[]{});
    }

    @Test
    void testPrimeNumberReturnsItself() {
        assertThat(primeFactors(2)).isEqualTo(new int[]{2});
        assertThat(primeFactors(3)).isEqualTo(new int[]{3});
        assertThat(primeFactors(23)).isEqualTo(new int[]{23});
    }

    @Test
    void testCompositeNumberReturnsPrimes() {
        assertThat(primeFactors(4)).isEqualTo(new int[]{2, 2});
        assertThat(primeFactors(9)).isEqualTo(new int[]{3, 3});
        assertThat(primeFactors(8)).isEqualTo(new int[]{2, 2, 2});
        assertThat(primeFactors(12)).isEqualTo(new int[]{2, 2, 3});
    }
}
```

## 회고
- 재귀적 풀이밖에 생각나지 않음.
- Java 에서 배열에 재귀적 풀이를 적용하는데에 어려움을 겪음.
- 반복문으로도 풀어보기.
- 개념과 용어를 잘 정리해서 일관된 이름을 사용하기.
- 안되는 순간(primeFactorsOf(8))에 어떻게 더 작게 피드백 받을수 있을지 고민하기.
- optional 의 anti pattern (if - isPresent - else - get) 을 피해서 의미를 드러내기
- 테스트함수의 명명규칙 찾아보기
