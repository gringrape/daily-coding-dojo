class Test2 extends org.scalatest.funsuite.AnyFunSuite {
  def solution1(phoneNumber: String): String = {
    val masking = "*" * (phoneNumber.length - 4)
    val numbers = phoneNumber.takeRight(4)
    masking + numbers
  }

  test("solution1") {
    assert(solution1("01033334444") == "*******4444")
  }
}
