def test_works():
  assert 1 + 1 == 2

def solution(A, B):
  A.sort()
  B.sort()

  def go(i, score, pointer_A):
    if i > len(B) - 1:
      return score
    
    return go(i + 1, score + 1, pointer_A + 1) if A[pointer_A] < B[i] else go(i + 1, score, pointer_A)
    
  return go(0, 0, 0)

def solution2(A, B):
  A.sort()
  B.sort()    

  score = 0
  pointer_A = 0
  for x in B:
    if A[pointer_A] < x:
      score += 1
      pointer_A += 1

  return score

def test_samples():
  for f in [solution, solution2]:
    assert f(
      [5, 1, 3, 7],
      [2, 2, 6, 8],
    ) == 3