import org.scalatest.funsuite.AnyFunSuite
import scala.annotation.tailrec

class Test extends AnyFunSuite {
  def solution(s: String): Int = {
    var results = List[Int]()

    def go(start: Int = 0, end: Int = s.length() - 1, count: Int = 0): Unit = {
      if (start > end) {
        results = count :: results
        return
      }

      if (start == end) {
        results = (count + 1) :: results
        return
      }

      if (s.charAt(start) == s.charAt(end)) {
        go(start + 1, end - 1, count + 2)
        return
      }

      go(start + 1, end)
      go(start, end - 1)
      go(start + 1, end - 1)
    }

    go()

    results.max
  }

  test("test works") {
    assert(1 + 1 === 2)
  }

  test("sample") {
    assert(solution("abcdcba") == 7)
    assert(solution("abacde") == 3)
  }
}
