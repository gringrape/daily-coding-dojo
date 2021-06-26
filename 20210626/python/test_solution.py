def test_works():
  assert 1 + 1 == 2

import re
from itertools import permutations

calculators = {
  '+': lambda x, y: x + y,
  '-': lambda x, y: x - y,
  '*': lambda x, y: x * y
}
  
def calculate(numbers, operators, ordered_operators):
  if not operators:
    return abs(numbers[0]) 

  priority_operator = ordered_operators[0]

  numbers_stack = [numbers[0]]
  operators_stack = []

  for number, operator in zip(numbers[1:], operators):
    if operator != priority_operator:
      numbers_stack.append(number)
      operators_stack.append(operator)
      continue
    
    accumulator = numbers_stack.pop()
    calculated = calculators[operator](accumulator, number)
    numbers_stack.append(calculated)

  return calculate(numbers_stack, operators_stack, ordered_operators[1:])

def solution(expression):
  numbers = [int(i) for i in re.split('[^\\d]', expression)]
  operators = re.sub('\\d{1,}', '', expression)

  return max(
    calculate(numbers, operators, ordered_operators) for ordered_operators in permutations(['+', '-', '*'])
  )    

def test_simple():
  assert solution('100+200') == 300
  assert solution('100-200') == 100
  assert solution('100*200') == 20000

def test_without_priority():
  assert solution('100+200-500') == 200

def test_with_priority():
  assert solution('100+20*50') == 6000
  assert solution('100+200*5+10*30') == 135000

def test_solution():
  assert solution("100-200*300-500+20") == 60420
