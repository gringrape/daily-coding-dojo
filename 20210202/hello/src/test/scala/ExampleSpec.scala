import org.scalatest.funsuite.AnyFunSuite
class SimpleTest extends AnyFunSuite {
  def factorial(n: Int): Int = {
    def go(n: Int, acc: Int): Int = 
      if (n <= 0) acc
      else go(n - 1, acc * n)
    go(n, 1)
  }
  
  test("factorial") {
    assert(factorial(1) == 1)
    assert(factorial(2) == 2)
    assert(factorial(3) == 6)
  }

  def sum(n: Int): Int = {
    def go(n: Int, acc: Int): Int =
      if (n <= 0) acc
      else go(n - 1, acc + n) 
    go(n, 0)
  }

  test("sum") {
    assert(sum(1) == 1)
    assert(sum(2) == 3)
    assert(sum(3) == 6)
  }
}
