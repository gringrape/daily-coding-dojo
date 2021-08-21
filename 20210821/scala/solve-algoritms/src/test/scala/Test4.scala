import org.scalatest.funsuite.AnyFunSuite
class Test4 extends AnyFunSuite {
  def isPrime(n: Int): Boolean = List
    .range(2, Math.sqrt(n).toInt + 1)
    .forall(n % _ != 0)

  def solution(nums: Vector[Int]): Int = nums
    .combinations(3)
    .map(_.sum)
    .count(isPrime)

  test("sample") {
    assert(solution(Vector(1, 2, 3, 4)) == 1)
  }
}
