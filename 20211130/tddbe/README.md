### 프로젝트 시작
```
gradle init
```

### gradle 설정
```
Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4] 2

Select implementation language:
  1: C++
  2: Groovy
  3: Java
  4: Kotlin
  5: Scala
  6: Swift
Enter selection (default: Java) [1..6] 3

Split functionality across multiple subprojects?:
  1: no - only one application project
  2: yes - application and library projects
Enter selection (default: no - only one application project) [1..2] 1

Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Groovy) [1..2] 1

Select test framework:
  1: JUnit 4
  2: TestNG
  3: Spock
  4: JUnit Jupiter
Enter selection (default: JUnit Jupiter) [1..4] 4
```

### 목표
- 통화가 다른 두 금액을 더하기
- 금액을 주식 수에 곱하기

### 목표를 구체적으로
> - 5 \$ + 10 CHF = 10 \$
> - 5 \$ * 2 = 10 \$

### 테스트 작성
> - 5 \$ * 2 = 10 \$

```java
@Test void testMultiplication() {
    Dollar five = new Dollar(5);
    five.times(2);

    assertEquals(10, five.amount);
}
```

### 스텁 구현
```java
public class Dollar {
    int amount;

    Dollar(int amount) {}

    void times(int multiplier) {}
}
```

### 구현
```java
public class Dollar {
    int amount;

    Dollar(int amount) {
        this.amount = amount;
    }

    void times(int multiplier) {
        this.amount *= multiplier;
    }
}
```

### 목표 수정
> - 5 \$ + 10 CHF = 10 \$
> - ~~5 \$ * 2 = 10 \$~~
> - amount 를 private 으로 만들기
> - **Dollar 부작용?**
> - Money 반올림?

### 스텁
`Dollar.java`:
```java
// ...
Dollar times(int multiplier) {
    return null;
}
// ...
```

### 구현
`Dollar.java`:
```java
// ...
Dollar times(int multiplier) {
    return null;
}
// ...
```

### 목표 수정
> - 5 \$ + 10 CHF = 10 \$
> - ~~5 \$ * 2 = 10 \$~~
> - amount 를 private 으로 만들기
> - ~~Dollar 부작용?~~
> - Money 반올림?
> - **equals()**

### 삼각측량
```java
@Test void testEquality() {
    assertEquals(new Dollar(10), new Dollar(10));
    assertNotEquals(new Dollar(10), new Dollar(11));
}
```

### 구현
`Dollar.java`:
```java
public boolean equals(Object object) {
    Dollar other = (Dollar) object;
    return this.amount == other.amount;
}
```

### 목표 수정
> - 5 \$ + 10 CHF = 10 \$
> - ~~5 \$ * 2 = 10 \$~~
> - **amount 를 private 으로 만들기**
> - ~~Dollar 부작용?~~
> - Money 반올림?
> - ~~equals()~~

### 테스트 수정
amount 를 private 으로 만들어주기 위해 사용하는 곳을 찾아서 없애기!
equality 를 이용하자

```java
@Test void testMultiplication() {
    Dollar five = new Dollar(5);
    assertEquals(new Dollar(10), five.times(2));
    assertEquals(new Dollar(15), five.times(3));
}
```

### 구현수정
`Dollar.java`:
```java
private int amount;
```

### 목표 수정

다른 화폐 단위의 표현

> - 5 \$ + 10 CHF = 10 \$ ---> 최종목표
> - ~~5 \$ * 2 = 10 \$~~
> - ~~amount 를 private 으로 만들기~~
> - ~~Dollar 부작용?~~
> - Money 반올림?
> - ~~equals()~~
> - hash code
> - Equal null
> - Eqaul object
> - **5 CHF * 2 = 10 CHF**

### 테스트 추가
```java
@Test void testFrancMultiplication() {
    Franc five = new Franc(5);
    assertEquals(new Franc(10), five.times(2));
    assertEquals(new Franc(15), five.times(3));
}
```

### 구현
중복을 통한 구현
`Dollar.java`:
```java
public class Franc {
    private int amount;

    Franc(int amount) {
        this.amount = amount;
    }

    Franc times(int multiplier) {
        return new Franc(amount * multiplier);
    }

    public boolean equals(Object object) {
        Franc other = (Franc) object;
        return this.amount == other.amount;
    }
}
```
### 목표 수정
> - 5 \$ + 10 CHF = 10 \$ ---> 최종목표
> - ~~5 \$ * 2 = 10 \$~~
> - ~~amount 를 private 으로 만들기~~
> - ~~Dollar 부작용?~~
> - Money 반올림?
> - ~~equals()~~
> - hash code
> - Equal null
> - Eqaul object
> - ~~5 CHF * 2 = 10 CHF~~
> - Dollar/Franc 중복
> - **공용 equals**
> - 공용 times

### 구현

상속을 이용해서 부모 클래스를 생성하고, 
동일한 모양으로 만들어서 부모 클래스로 옮겨 주자.
옮겨주는 과정에서 지속적으로 테스트 실행하는 것을 잊지 말자.

`Money.java`:
```java
public class Money {
    protected int amount;

    public boolean equals(Object object) {
        Money other = (Money) object;
        return this.amount == other.amount;
    }
}
```

`Dollar.java`:
```java
public class Dollar extends Money {
    Dollar(int amount) {
        this.amount = amount;
    }

    Dollar times(int multiplier) {
        return new Dollar(amount * multiplier);
    }
}
```

`Franc 테스트`:
```java
@Test void testEquality() {
    assertEquals(new Dollar(10), new Dollar(10));
    assertNotEquals(new Dollar(10), new Dollar(11));
    assertEquals(new Franc(10), new Franc(10)); // ! 테스트 코드의 중복 발생
    assertNotEquals(new Franc(10), new Franc(11)); // ! 테스트 코드의 중복 발생
}
```

### 목표 수정
> - 5 \$ + 10 CHF = 10 \$ ---> 최종목표
> - ~~5 \$ * 2 = 10 \$~~
> - ~~amount 를 private 으로 만들기~~
> - ~~Dollar 부작용?~~
> - Money 반올림?
> - ~~equals()~~
> - hash code
> - Equal null
> - Eqaul object
> - ~~5 CHF * 2 = 10 CHF~~
> - Dollar/Franc 중복
> - ~~공용 eqauls~~
> - 공용 times
> - **Franc 과 Dollar 비교**

### 테스트 추가
Dollar 와 Franc 은 다르다
```java
@Test void testEquality() {
    // ...
    assertNotEquals(new Franc(5), new Dollar(5));
}
```

### 구현
화폐의 종류와 금액 비교
`Money.java`:
```java
public boolean equals(Object object) {
    Money other = (Money) object;

    return this.getClass().equals(other.getClass()) && this.amount == other.amount;
}
```

### 목표 수정
> - 5 \$ + 10 CHF = 10 \$ ---> 최종목표
> - ~~5 \$ * 2 = 10 \$~~
> - ~~amount 를 private 으로 만들기~~
> - ~~Dollar 부작용?~~
> - Money 반올림?
> - ~~equals()~~
> - hash code
> - Equal null
> - Eqaul object
> - ~~5 CHF * 2 = 10 CHF~~
> - **Dollar/Franc 중복**
> - ~~공용 eqauls~~
> - 공용 times
> - ~~Franc 과 Dollar 비교~~
> - 통화?

하위 클래스를 제거해보자
-> 테스트에서 하위클래스를 참조하는 부분을 제거해보자

### 목표수정
> - 5 \$ + 10 CHF = 10 \$ ---> 최종목표
> - ~~5 \$ * 2 = 10 \$~~
> - ~~amount 를 private 으로 만들기~~
> - ~~Dollar 부작용?~~
> - Money 반올림?
> - ~~equals()~~
> - hash code
> - Equal null
> - Eqaul object
> - ~~5 CHF * 2 = 10 CHF~~
> - Dollar/Franc 중복
> - ~~공용 eqauls~~
> - 공용 times
> - ~~Franc 과 Dollar 비교~~
> - **통화?**

### 목표수정
> - 5 \$ + 10 CHF = 10 \$ ---> 최종목표
> - ~~5 \$ * 2 = 10 \$~~
> - ~~amount 를 private 으로 만들기~~
> - ~~Dollar 부작용?~~
> - Money 반올림?
> - ~~equals()~~
> - hash code
> - Equal null
> - Eqaul object
> - ~~5 CHF * 2 = 10 CHF~~
> - Dollar/Franc 중복
> - ~~공용 eqauls~~
> - **공용 times**
> - ~~Franc 과 Dollar 비교~~
> - ~~통화?~~

### 목표수정
> - 5 \$ + 10 CHF = 10 \$ ---> 최종목표
> - ~~5 \$ * 2 = 10 \$~~
> - ~~amount 를 private 으로 만들기~~
> - ~~Dollar 부작용?~~
> - Money 반올림?
> - ~~equals()~~
> - hash code
> - Equal null
> - Eqaul object
> - ~~5 CHF * 2 = 10 CHF~~
> - **Dollar/Franc 중복**
> - ~~공용 eqauls~~
> - ~~공용 times~~
> - ~~Franc 과 Dollar 비교~~
> - ~~통화?~~

### 목표수정
> - 5 \$ + 10 CHF = 10 \$
> - **5 \$ + 5 \$ = 10 \$**

### 테스트 작성
```java
public void testSimpleAddition() {
    Money sum = Money.dollar(5).plus(Money.dollar(5));
    assertEquals(Money.dollar(10), sum);
}
```

### 구현
```java
public Money plus(Money addend) {
    return new Money(amount + addend.amount, currency);
}
```

### 테스트 수정
다중 통화 사용에 대한 부분을 시스템 외부에 숨기고 싶다.
편하게 여러 환율을 다루면서도 산술연산을 산술연산처럼 다루고 싶다. 

```java
@Test void testSimpleAddition() {
    Money five = Money.dollar(5);
    Expression sum = five.plus(five);
    Bank bank = new Bank();
    Money reduced = bank.reduce(sum, "USD");
    assertEquals(Money.dollar(10), reduced);
}
```
