import org.scalatest.funsuite.AnyFunSuite
class Test extends AnyFunSuite {
  def solution(lottos: Vector[Int], win_nums: Vector[Int]): Vector[Int] = {
    val countZeros = lottos.count(_ == 0)
    val countMatch = lottos.intersect(win_nums).size

    val ranks = List(6, 6, 5, 4, 3, 2, 1)

    return Vector(countZeros + countMatch, countMatch).map(ranks.apply(_))
  }

  test("test") {
    assert(
      solution(
        Vector(44, 1, 0, 0, 31, 25),
        Vector(31, 10, 45, 1, 6, 19)
      ) == Vector(3, 5)
    )
  }
}
