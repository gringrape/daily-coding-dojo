import re, functools

def addOnlyNotExist(list1, list2):
  removed = [el for el in list2 if el not in set(list1)]
  return list1 + removed

def test_addOnlyNotExist():
  assert addOnlyNotExist([1], [2, 1]) == [1, 2]
  assert addOnlyNotExist([2], [3, 2, 4]) == [2, 3, 4]

def solution(expression):
  numsList = [list(map(int, el[1:-1].split(','))) for el in re.findall('{[^{^}]+}', expression)]
  sortedNumsList = sorted(numsList, key=lambda each: len(each))
  return functools.reduce(lambda a, b: list(set(a + b)), sortedNumsList)

def test_simple():
  assert solution("{{1}}") == [1]
  assert solution("{{1}, {1, 2}}") == [1, 2]
  assert solution("{{1, 2}, {1}}") == [1, 2]
  assert solution("{{1}, {2, 1}}") == [1, 2]
