import org.scalatest.funsuite.AnyFunSuite;

class Test extends AnyFunSuite {
  def solution(left: Int, right: Int): Int = {
    def isInt(n: Double) = n.floor == n

    def hasOddDivisors(n: Int) = isInt(Math.sqrt(n))

    def sign(n: Int) = if (hasOddDivisors(n)) -1 else +1

    Range
      .inclusive(left, right, 1)
      .map(n => sign(n) * n)
      .sum
  }

  test("test is working") {
    assert(1 + 1 == 2)
  }

  test("simple") {
    assert(solution(1, 1) == -1)
    assert(solution(1, 2) == 1)
    assert(solution(1, 3) == 4)
  }
}
