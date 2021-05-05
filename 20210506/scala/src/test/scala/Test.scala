import org.scalatest.funsuite.AnyFunSuite

class Test extends AnyFunSuite {
  def dotProduct(a: List[Int], b: List[Int]): Int = a
    .zip(b)
    .map({ case (x, y) => x * y })
    .sum

  test("dotProduct") {
    assert(dotProduct(List(1, 2, 3, 4), List(-3, -1, 0, 2)) == 3)
  }
}
