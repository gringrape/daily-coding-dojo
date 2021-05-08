import org.scalatest.funsuite.AnyFunSuite

class Test extends AnyFunSuite {
  test("CubeCalculator.cube") {
    assert(Math.pow(3, 3) === 27)
  }
}
