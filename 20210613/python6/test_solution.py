def test_is_working():
  assert 1 + 1 == 2

def solution(N, add = 0):
  if N == 1:
    return add + 1
  if N % 2 == 1:
    return solution((N - 1) / 2, add + 1)
  if N % 2 == 0:
    return solution(N / 2, add)

def test_solution():
  assert solution(1) == 1
  assert solution(2) == 1
  assert solution(3) == 2
  assert solution(4) == 1
  assert solution(5) == 2
  assert solution(6) == 2
  assert solution(5000) == 5
