import org.scalatest.funsuite.AnyFunSuite

class Test extends AnyFunSuite {
  def convert(word: String) = word
    .toLowerCase()
    .capitalize

  def solution(string: String) = {
    string
      .split(" ", -1)
      .map((word: String) => {
        if (word.isBlank()) word
        else convert(word)
      })
      .mkString(" ")
  }

  test("simple") {
    assert(solution("she") == "She")
  }

  test("lowercase other than head characters") {
    assert(solution("sHe") == "She")
  }

  test("more than one word") {
    assert(solution("she is") == "She Is")
  }

  test("starts with blank") {
    assert(solution(" she is") == " She Is")
  }

  test("blank") {
    assert(solution(" ") == " ")
  }

  test("multiple blanks") {
    assert(solution("she   is") == "She   Is")
    assert(solution("  she   is   ") == "  She   Is   ")
  }
}
