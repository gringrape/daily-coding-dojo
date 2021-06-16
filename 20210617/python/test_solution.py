def test_is_working():
  assert 1 + 1 == 2

def gcd(w, h):
  return max(
    i for i in range(1, min(w, h) + 1) 
    if w % i == 0 and h % i == 0
  )

def solution(w, h):
  n = gcd(w, h)
  return (w - 1) * (h - 1) + n - 1

def test_solution():
  assert solution(8, 12) == 80