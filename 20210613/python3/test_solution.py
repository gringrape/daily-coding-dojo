def test_simple():
  assert 1 + 1 == 2

def solution(s):
  stack = []
  
  def push(c):
    if not stack or stack[-1] != c:
      stack.append(c)
      return
    stack.pop()

  def isEmpty():
    return not stack
  
  for c in s:
    push(c)
  
  return 1 if isEmpty() else 0 

def test_solution():
  assert solution('baabaa') == 1
  assert solution('cdcd') == 0