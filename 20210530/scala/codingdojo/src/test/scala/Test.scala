import org.scalatest.funsuite.AnyFunSuite
import scala.annotation.tailrec

class Test extends AnyFunSuite {
  def solution(N: Int, a: Int, b: Int) = {
    @tailrec
    def go(a: Int, b: Int, round: Int): Int = {
      val groupOfA = (a + 1) / 2;
      val groupOfB = (b + 1) / 2;

      if (groupOfA == groupOfB) round
      else go(groupOfA, groupOfB, round + 1)
    }

    go(a, b, 1)
  }

  test("test is working") {
    assert(1 + 1 == 2)
  }

  test("solution function exists") {
    assert(solution(2, 1, 2) == 1)
  }
}
