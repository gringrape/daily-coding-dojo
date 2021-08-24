require 'minitest/autorun'
require 'minitest/reporters'
Minitest::Reporters.use!

class Test < Minitest::Test
  def test_solution
    assert_equal 1 + 1, 2
  end
end
