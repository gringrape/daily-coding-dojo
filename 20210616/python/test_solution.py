def test_is_working():
  assert 1 + 1 == 2

def failure_rate(n, stages):
  a = len([x for x in stages if x == n])
  b = len([x for x in stages if x >= n])

  if b == 0:
    return 0
  
  return a / b

def test_failure_rate():
  stage = [2, 1, 2, 6, 2, 4, 3, 3]
  stage.sort()
  
  assert failure_rate(1, stage) == 1 / 8
  assert failure_rate(2, stage) == 3 / 7
  assert failure_rate(3, stage) == 2 / 4
  assert failure_rate(4, stage) == 1 / 2
  assert failure_rate(5, stage) == 0

def solution(N, stages):
  copied = [x for x in stages]
  copied.sort()

  return sorted(
    [n for n in range(1, N + 1)],
    key=lambda n: failure_rate(n, copied), reverse=True 
  )

def test_solution():
  stages = [2, 1, 2, 6, 2, 4, 3, 3]

  assert solution(5, stages) == [3, 4, 2, 1, 5]
  assert solution(4, [4, 4, 4, 4, 4]) == [4, 1, 2, 3]
  assert solution(1, [1]) == [1]
