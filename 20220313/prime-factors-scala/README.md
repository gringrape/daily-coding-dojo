## 소스코드
다형성과 패턴매칭을 이용해서 풀이하고 싶었음.
```scala
import org.scalatest.funsuite.AnyFunSuite

sealed trait Number {
  def primeFactors: List[Int]
}
class Prime(n: Int) extends Number {
  def primeFactors = n match {
    case 1 => Nil
    case n => n :: Nil
  }
}
class Composite(n: Int) extends Number {
  def primeFactors = {
    val smallestPrimeFactor = Number.smallestPrimeFactor(n);
    smallestPrimeFactor :: Number(n / smallestPrimeFactor).primeFactors
  }
}

object Number {
  def apply(n: Int): Number =
    if (isPrime(n)) new Prime(n)
    else new Composite(n)

  def isPrime(n: Int): Boolean =
    (2 until n).forall(n % _ != 0)

  def smallestPrimeFactor(n: Int): Int =
    (2 until n).find(n % _ == 0).get
}

class PrimeFactorsTest extends AnyFunSuite {
  test("prime factors") {
    assert(Number(1).primeFactors == List())
    assert(Number(2).primeFactors == List(2))
    assert(Number(4).primeFactors == List(2, 2))
    assert(Number(8).primeFactors == List(2, 2, 2))
    assert(Number(12).primeFactors == List(2, 2, 3))
  }
}
```

## 회고
- object 와 sealed trait 에 대해서 정확히 이해하지 못하여, 불필요한 시간 낭비.
- 대수적 자료구조에 대한 복습 필요.