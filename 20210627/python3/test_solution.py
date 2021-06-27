def test_works():
  assert 1 + 1 == 2

def solution(d, budget):
  return next((
    i for i in reversed(range(1, len(d) + 1))
    if sum(sorted(d)[:i]) <= budget
  ), 0)
  
def test_samples():
  assert solution([1,3,2,5,4], 9) == 3

def test_all_department():
  assert solution([2,2,3,3], 10) ==	4

def test_no_department():  
  assert solution([9,5,5,3], 2) == 0
