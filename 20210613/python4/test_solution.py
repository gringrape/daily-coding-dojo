def test_is_working():
  assert 1 + 1 == 2

def f(x):
  binary_string = bin(x)[2:]
  reverse = ''.join(reversed(binary_string))

  new_strings = {
    'case1': '1' + binary_string.replace('1', '0', 1),
    'case2': ''.join(reversed(reverse.replace('0', '1', 1))),
    'case3': ''.join(reversed(reverse.replace('10', '01', 1)))
  }
  case_checks = {
    'case1': all(x == '1' for x in binary_string),
    'case2': reverse.startswith('0'),
    'case3': reverse.startswith('1')
  }
  
  for case, case_check in case_checks.items():
    if case_check:
      return int(new_strings[case], 2)

def solution(numbers):
  return [f(n) for n in numbers]

def test_f():
  assert f(898) == 899
  assert f(2) == 3
  assert f(7) == 11
