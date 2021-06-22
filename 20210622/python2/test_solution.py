import heapq

def test_works():
  assert 1 + 1 == 2

def solution(n, works):
  if sum(works) <= n:
    return 0

  minus_works = [-1 * work for work in works]  
  heapq.heapify(minus_works)

  for _ in range(n):
    M = heapq.heappop(minus_works)
    heapq.heappush(minus_works, M + 1)

  return sum(x ** 2 for x in minus_works)

def test_solution():
  assert solution(4, [4, 3, 3]) == 12
  assert solution(1, [2, 1, 2]) == 6