import org.scalatest.funsuite.AnyFunSuite

class Test extends AnyFunSuite {
  def sumOf(absolutes: List[Int], signs: List[Boolean]) = {
    absolutes
      .zip(signs)
      .map({ case (absolute, sign) =>
        if (sign) absolute.unary_+ else absolute.unary_-
      })
      .sum
  }

  test("sumOf with plus signs") {
    assert(sumOf(List(1), List(true)) == 1)
    assert(sumOf(List(1, 2), List(true, true)) == 3)
  }

  test("sumOf with minus signs") {
    assert(sumOf(List(1), List(false)) == -1)
    assert(sumOf(List(1, 3), List(false, false)) == -4)
  }
}
