require 'minitest/autorun'
require 'minitest/reporters'
Minitest::Reporters.use!

class Test < Minitest::Test
  def split(string)
    string.split(/ /)
  end

  def test_split
    assert_equal split('SI JAVA JAVASCRIPT SQL PYTHON C#'), ['SI', 'JAVA', 'JAVASCRIPT', 'SQL', 'PYTHON', 'C#']
  end

  def calculate_score(field_langs, languages, preferences)
    language_prefences = languages.each_with_index.to_h { |l, i| [l, preferences[i]] }

    field_langs.each_with_index.sum(0) do |value, i|
      (5 - i) * (language_prefences[value] or 0)
    end
  end

  def test_calculate_score
    assert_equal calculate_score(
      ['JAVA', 'JAVASCRIPT', 'SQL', 'PYTHON', 'C#'],
      ['PYTHON', 'C++', 'SQL'],
      [7, 5, 5]
    ), 29
  end

  def solution(table, languages, preferences)
    table.map { |string| string.split(/ /) }
         .map { |key, *values| [key, calculate_score(values, languages, preferences)] }
         .sort
         .max_by { |_, score| score }[0]
  end

  def test_solution
    assert_equal solution(
      ['SI JAVA JAVASCRIPT SQL PYTHON C#', 'CONTENTS JAVASCRIPT JAVA PYTHON SQL C++',
       'HARDWARE C C++ PYTHON JAVA JAVASCRIPT', 'PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP', 'GAME C++ C# JAVASCRIPT C JAVA'],
      ['PYTHON', 'C++', 'SQL'],
      [7, 5, 5]
    ), 'HARDWARE'
  end
end
