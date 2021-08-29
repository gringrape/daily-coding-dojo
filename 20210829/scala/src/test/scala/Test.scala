class Test extends org.scalatest.funsuite.AnyFunSuite {
  def solution1(x: Int, n: Int): Vector[Long] = {
    Vector
      .range(1, n + 1)
      .map(_ * x)
  }

  test("solution1") {
    assert(solution1(2, 5) == Vector(2, 4, 6, 8, 10))
  }

  def solution2(x: Int, n: Int): Vector[Long] = {
    Vector.iterate[Long](x, n)(_ + x)
  }

  test("solution2") {
    assert(solution2(2, 5) == Vector(2, 4, 6, 8, 10))
  }

  def solution3(x: Int, n: Int): Vector[Long] = {
    Stream.range[Long](1, n + 1).map(_ * x).toVector
  }

  test("solution3") {
    assert(solution3(2, 5) == Vector(2, 4, 6, 8, 10))
  }
}
