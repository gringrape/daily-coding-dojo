def test_works():
  assert 1 + 1 == 2

import sys
import heapq

def solution(points):
  cost = 0
  D = [sys.maxsize for _ in points]
  D[0] = 0

  Q = []
  for entry in zip(D, points):
    heapq.heappush(Q, list(entry))

  while Q:
    print(Q)
    Du, [ux, uy] = heapq.heappop(Q)
    cost += Du
    for entry in Q:
      Dv, [vx, vy] = entry 
      w = abs(ux - vx) + abs(uy - vy)
      if w < Dv:
        entry[0] = w
    heapq.heapify(Q)

  return cost

def test_samples():
  # assert solution([
  #   [0, 0], [2, 2], [3, 10], [5, 2], [7, 0]
  # ]) == 20
  assert solution([
    [3, 12], [-2, 5], [-4, 1]
  ]) == 18
