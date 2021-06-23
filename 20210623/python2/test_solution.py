def test_works():
  assert 1 + 1 == 2

def solution(n, a = 1, b = 1):
  while n > 0:
    temp = b
    b = (a + b) % 1234567
    a = temp
    n = n - 1
  return a

def test_samples():
  assert solution(4) == 5
  assert solution(3) == 3