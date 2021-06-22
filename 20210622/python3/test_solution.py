def test_works():
  assert 1 + 1 == 2

def factorial(n):
  if n <= 1:
    return 1
  return n * factorial(n - 1)

def test_factorial():
  assert factorial(1) == 1
  assert factorial(2) == 2
  assert factorial(5) == 120

def solution(n, k):
  def go(N, K, remainders = [i for i in range(1, n + 1)]):
    if not remainders:
      return []
    
    group = int((K - 1)/factorial(N - 1))
    current_number = remainders[group]

    return [
      current_number,
      *go(
        N - 1, 
        K - group * factorial(N - 1),
        [i for i in remainders if i != current_number]        
      )
    ]      

  return go(n, k)

def test_samples():
  assert solution(4, 5) == [1, 4, 2, 3]
  assert solution(3, 5) == [3, 1, 2]
  assert solution(3, 1) == [1, 2, 3]
  