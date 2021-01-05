from collections import Counter
import re

def solution(expression):
  dic = Counter(re.findall('\d+', expression))
  return list(map(int,[k for k, v in sorted(dic.items(), key=lambda x: x[1], reverse=True)]))

def test_simple():
  assert solution("{{1}}") == [1]
  assert solution("{{1}, {1, 2}}") == [1, 2]
  assert solution("{{1, 2}, {1}}") == [1, 2]
  assert solution("{{1}, {2, 1}}") == [1, 2]
