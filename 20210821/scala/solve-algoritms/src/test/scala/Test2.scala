import org.scalatest.funsuite.AnyFunSuite
class Test2 extends AnyFunSuite {
  def solution(
      arr1: Vector[Vector[Int]],
      arr2: Vector[Vector[Int]]
  ): Vector[Vector[Int]] = {
    return arr1
      .zip(arr2)
      .map({ case (a, b) =>
        a.zip(b).map({ case (x, y) => x + y })
      })

  }

  test("test works") {
    assert(
      solution(
        Vector(
          Vector(1, 2),
          Vector(2, 3)
        ),
        Vector(
          Vector(3, 4),
          Vector(5, 6)
        )
      ) == Vector(
        Vector(4, 6),
        Vector(7, 9)
      )
    )
  }
}
