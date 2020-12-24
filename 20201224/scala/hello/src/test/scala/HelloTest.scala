import org.scalatest.funsuite.AnyFunSuite

class HelloTest extends AnyFunSuite {
  def hello(name: String = "new comer"): String = "Hello, " + name

  test("hello") {
    assert(hello() == "Hello, new comer")
    assert(hello("Jin") == "Hello, Jin")
  }
}