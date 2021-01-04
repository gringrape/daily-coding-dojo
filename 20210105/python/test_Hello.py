from itertools import combinations

def solution(arr):
  return sorted({x + y for (x, y) in combinations(arr, 2)})

def test_simple():
  assert solution([1, 1]) == [2]
  assert solution([1, 2, 3]) == [3, 4, 5]
  assert solution([3, 2, 1]) == [3, 4, 5]
