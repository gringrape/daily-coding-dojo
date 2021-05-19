import org.scalatest.funsuite.AnyFunSuite;
import scala.annotation.tailrec

class Test extends AnyFunSuite {
  def solution(left: Int, right: Int): Int = {
    def isInt(n: Double) = n.floor == n

    def hasOddDivisors(n: Int) = isInt(Math.sqrt(n))

    def sign(n: Int) = if (hasOddDivisors(n)) -1 else +1

    @tailrec
    def go(start: Int, end: Int, sum: Int = 0): Int = {
      if (start > end) sum
      else
        go(
          start + 1,
          end,
          sum + sign(start) * start
        )
    }
    go(left, right, 0)
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
