require 'minitest/autorun'
require 'minitest/reporters'
Minitest::Reporters.use!

class Test < Minitest::Test
  def solution(array, commands)
    commands.map { |i, j, k| array[i - 1..j - 1].sort[k - 1] }
  end

  def test_works
    assert_equal solution(
      [1, 5, 2, 6, 3, 7, 4],
      [[2, 5, 3], [4, 4, 1], [1, 7, 3]]
    ), [5, 6, 3]
  end
end
