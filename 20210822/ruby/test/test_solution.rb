require 'minitest/autorun'
require 'minitest/reporters'
Minitest::Reporters.use!

class Test < Minitest::Test
  def solution
    1
  end

  def test_works
    assert_equal solution, 1
  end
end
