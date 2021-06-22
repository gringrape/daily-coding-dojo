def test_works():
  assert 1 + 1 == 2

def solution(n, lost, reserve):
  def borrow_nearby(i, real_lost, real_reserve):
    for x in (i - 1, i + 1):
      if x in real_reserve:
        real_reserve.remove(x)
        real_lost.remove(i)
        return

  real_lost = [i for i in lost if i not in reserve]
  real_reserve = [i for i in reserve if i not in lost]

  for i in [*real_lost]:
    borrow_nearby(i, real_lost, real_reserve)

  return n - len(real_lost)

def test_samples():
  assert solution(5, [2, 4], [1, 3, 5]) == 5
  assert solution(5, [2, 3, 4], [1, 3, 5]) == 5