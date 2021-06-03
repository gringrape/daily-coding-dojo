import org.scalatest.funsuite.AnyFunSuite
import scala.annotation.tailrec

class Test extends AnyFunSuite {
  def fib(n: Int): Int = {
    @tailrec
    def go(i: Int = 0, a: Int = 0, b: Int = 1): Int = {
      if (i == n) a
      else go(i + 1, b, (a + b) % 1234567)
    }
    go()
  }

  test("test is working") {
    assert((1 + 1) == 2)
  }

  test("simple") {
    assert(fib(0) == 0)
    assert(fib(1) == 1)
  }

  test("from the 'fib(2)'") {
    assert(fib(2) == 1)
    assert(fib(3) == 2)
  }
}
