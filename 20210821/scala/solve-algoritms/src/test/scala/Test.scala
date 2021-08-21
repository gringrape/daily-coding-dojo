import org.scalatest.funsuite.AnyFunSuite
class Test extends AnyFunSuite {
  def solution(n: Int): Int = Stream
    .range(1, n + 1)
    .filter(n % _ === 0)
    .sum

  test("test works") {
    assert(solution(12) === 28)
  }
}
