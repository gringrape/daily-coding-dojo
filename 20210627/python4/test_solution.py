def test_works():
  assert 1 + 1 == 2

from itertools import combinations

import math

def is_prime(n):
  return all(
    n % i != 0 for i in range(2, int(math.sqrt(n) + 1))
  )

def test_is_prime():
  assert is_prime(2) == True
  assert is_prime(7) == True
  assert is_prime(6) == False

def solution(nums):
  return len(list(
    sum_nums for combination in combinations(nums, 3)
    if is_prime((sum_nums := sum(combination)))
  ))

def test_samples():
  assert solution([1, 2, 3, 4]) == 1
  assert solution([1, 2, 7, 6, 4]) == 4