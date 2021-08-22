import org.scalatest.funsuite.AnyFunSuite

class Test extends AnyFunSuite {
  def solution(numbers: Vector[Int], target: Int, i: Int = 0): Int = {
    val result = if (target == 0) 1 else 0

    if (i == numbers.length) result
    else
      solution(numbers, target + numbers(i), i + 1) +
        solution(numbers, target - numbers(i), i + 1)
  }

  test("test simple") {
    assert(solution(Vector(1, 1), 2) == 1)
    assert(solution(Vector(1, 1, 1, 1, 1), 3) == 5)
  }
}
