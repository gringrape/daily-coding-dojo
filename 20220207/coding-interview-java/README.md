## 문제
64 비트로 이루어진 숫자가 매우 많을때, `패리티` 를 계산하시오.

## 패리티란?
`패리티` 가 무엇인지 알지 못하는 상태이므로, 패리티가 무엇인지 알아봅시다.
패리티는 다음과 같은 목적이 있습니다.
> The parity bit ensures that the total number of 1-bits in the string is even or odd. - [Wikipedia](https://en.wikipedia.org/wiki/Parity_bit#cite_note-1)

1-bits 의 합계가 홀수이면 1, 짝수이면 0 의 값을 가집니다.

## 단순한 문제
많은 숫자를 다루는 것은 아직 무리인것 같습니다. 지금은 일단, 숫자가 하나만 주어지는 경우를 다루도록 하겠습니다. 패리티의 정의를 스펙으로 생각한다면, 몇가지의 테스트를 작성해 볼 수 있을 것 같습니다. 먼저 몇가지 숫자의 이진수형태를 써 보도록 하겠습니다.

> 1011(2) <=> 11
> 1000(2) <=> 8
> 1111(2) <=> 15

1 bit 의 개수를 세어서 패리티를 계산해봅시다.

> 1011(2) <=> 11 -> parity: 1
> 1000(2) <=> 8 -> parity: 1
> 1111(2) <=> 15 -> parity: 0

## 테스트 작성
이제 위의 사례들에 대한 테스트를 작성해 볼 수 있습니다. 가볍게 하나만 시작해보도록 하겠습니다.
```java
class AppTest {
    @Test
    void testParity() {
        assertThat(parity(11)).isEqualTo(1);
    }
}
```

테스트를 실행하면 컴파일에 실패합니다. 다음과 같이 단숨에 성공하도록 해봅시다.

```java
class AppTest {
    public int parity(long number) {
        return 1;
    }

    @Test
    void testParity() {
        assertThat(parity(11)).isEqualTo(1);
    }
}
```

단숨에 진행하긴 했지만, 여기서는 두개의 의사결정이 있었습니다. 입력값과 반환값의 형식이 그것입니다. 먼저 입력값에 관한 의사결정입니다. 우리가 원하는 것은 64bit 숫자의 패리티를 구하는 것이기 때문에 적합한 원시자료형을 써야 합니다. [Oracle 문서](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)를 보면 정수 자료형들의 스펙에 대해서 알 수 있습니다. 이 경우는 long 을 사용하면 좋겠네요.

> - byte: The byte data type is an 8-bit signed two's complement integer.
- short: The short data type is a 16-bit signed two's complement integer.
- int: By default, the int data type is a 32-bit signed two's complement integer.
- long: The long data type is a 64-bit two's complement integer.

다음으로는 반환값입니다. parity 의 값은 실제로 0 과 1 만을 가지므로, int 형은 적절하지 않아 보입니다. enum 으로 따로 정의하는 것이 더 좋을 것 같지만, 여기서는 편의를 위해 int 를 사용하도록 하겠습니다.

## 무식한 방법
무식하게 해봅시다. 무식한 전략은 일반적으로 `모두 다 센다` 는 느낌입니다. 이 때도, 할 일에 대한 정확한 정의는 필요합니다. 다음과 같이 할 일을 정의해보도록 하겠습니다.

> 1 bit 를 가장 작은 자리 부터 하나씩 세어나가기

이제는 드디어 `어떻게` 의 문제까지 왔습니다. 비트 연산에 대해서 알고 있다면 이 문제는 간단하게 해결할 수 있습니다. 먼저, 가장 작은 자리의 비트를 세는 것은 `number & 1` 로 해결 할 수 있습니다. 더 큰 자리로 넘어가는 것은 shift 연산으로 해주도록 합시다. `number >> 1`. 이를 검증하기 위해 수작업으로 피드백을 받읍시다. `11` 을 예로 들어보죠.

`shell`:
```bash
jshell
```
다음과 같이 계산을 수동으로 해주었습니다.

> **jshell> 11 & 1
> $1 ==> 1**
>
>jshell> 11 >> 1
>$2 ==> 5
>
>**jshell> 5 & 1
>$3 ==> 1**
>
>jshell> 5 >> 1
>$4 ==> 2
>
>**jshell> 2 & 1
$5 ==> 0**
>
jshell> 2 >> 1
$6 ==> 1
>
**jshell> 1 & 1
$7 ==> 1**
>
jshell> 1 >> 1
$8 ==> 0


bold 부분을 합치면 1101(2) 로 원래 숫자인 11 이 나옵니다. 이제, 위의 수동 작업을 코드로 작성하면 하나의 숫자에 대한 패리티를 얻을 수 있게 됩니다.

```java
public int parity(long number) {
    return Stream.iterate(number, n -> n > 0, n -> n >> 1)
            .map(n -> n & 1)
            .mapToInt(Long::intValue)
            .sum() % 2;
}
```

Wrapper 를 이용할 필요가 없으므로, LongStream 을 이용하도록 합시다.

```java
public int parity(long number) {
    return (int) LongStream.iterate(number, n -> n > 0, n -> n >> 1)
            .map(n -> n & 1)
            .sum() % 2;
}
```

## 비트 트릭
