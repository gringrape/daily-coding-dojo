def test_is_working():
  assert 1 + 1 == 2

def rotate(s, x):
  return s[x:] + s[:x]

def test_rotate():
  assert rotate("}]()[{", 1) == "]()[{}"
  assert rotate("}]()[{", 2) == "()[{}]"
  assert rotate("}]()[{", 4) == "[{}]()"

pairs = {
  '}': '{',
  ')': '(',
  ']': '['
}

class Stack:
  def __init__(self):
      self.data = []

  def push(self, c):
    if self.data and self.data[-1] == pairs.get(c, 'x'):
      self.data.pop()
      return
    self.data.append(c)
  
  def is_empty(self):
    return not self.data

def count_right_pairs(s):
  stack = Stack()

  count = 0
  for c in s:
    stack.push(c)
    if stack.is_empty():
      count = count + 1

  return count

def test_count_right_pairs():
  assert count_right_pairs('()[{}]') == 2
  assert count_right_pairs('[](){}') == 3

def solution(s):
  def is_right(str):
    stack = Stack()
    for c in str:
      stack.push(c)
    result = stack.is_empty()
    return result

  for x in range(0, len(s)):
    rotated = rotate(s, x)
    if is_right(rotated):
      return count_right_pairs(rotated)
  return 0  

def test_solution():
  assert solution("[](){}") == 3
  assert solution("}]()[{") == 2
