def test_is_working():
  assert 1 + 1 == 2

def solution(nums):
  n_2 = len(nums) / 2
  kinds = len(set(nums))
  return n_2 if kinds >= n_2 else kinds

def test_samples():
  assert solution([3, 1, 2, 3]) == 2
  assert solution([3, 3, 3, 2, 2, 4]) == 3
  assert solution([3, 3, 3, 2, 2, 2]) == 2
