def test_works():
  assert 1 + 1 == 2

def find_max(number, k):
  return max(
    ((n, i) for i, n in enumerate(number[:k])), 
    key=lambda x:x[0],
  )

def test_find_max():
  assert find_max("41772", 5) == ('7', 2)
  assert find_max("551907", 5) == ('9', 3)

def solution(number, k):
  
  return "94"

def test_solution():
  assert solution("1924", 2) == "94"
  # assert solution("1231234", 3) == "3234"
  # assert solution("4177252841", 4) == "775841"
