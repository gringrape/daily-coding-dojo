import org.scalatest.funsuite.AnyFunSuite
class Test5 extends AnyFunSuite {
  def solution(
      arr1: Vector[Vector[Int]],
      arr2: Vector[Vector[Int]]
  ): Vector[Vector[Int]] = arr1.map(row =>
    arr2.transpose.map(column => (row, column).zipped.map(_ * _).sum)
  )

  test("sample") {
    assert(
      solution(
        Vector(
          Vector(1, 4),
          Vector(3, 2),
          Vector(4, 1)
        ),
        Vector(
          Vector(3, 3),
          Vector(3, 3)
        )
      ) == Vector(
        Vector(15, 15),
        Vector(15, 15),
        Vector(15, 15)
      )
    )
  }
}
