import org.scalatest.funsuite.AnyFunSuite
class Test3 extends AnyFunSuite {
  def solution(array: Vector[Int], commands: Vector[Vector[Int]]): Vector[Int] =
    commands
      .map({ case Vector(a, b, c) =>
        array.slice(a - 1, b).sorted.apply(c - 1)
      })

  test("test works") {
    assert(
      solution(
        Vector(1, 5, 2, 6, 3, 7, 4),
        Vector(
          Vector(2, 5, 3),
          Vector(4, 4, 1),
          Vector(1, 7, 3)
        )
      ) == Vector(5, 6, 3)
    )
  }
}
