def test_works():
  assert 1 + 1 == 2

import sys
import heapq

def solution(n, costs):
  w = [[sys.maxsize for _ in range(n)] for _ in range(n)]

  for i, j, cost in costs:
    w[i][j] = cost
    w[j][i] = cost

  cost = 0
  D = [sys.maxsize] * n
  D[0] = 0
  Q = []

  for i in range(n):
    heapq.heappush(Q, [D[i], i])

  while Q:
    Du, u = heapq.heappop(Q)
    cost += Du
    for entry in Q:
      Dv, v = entry
      if w[u][v] < Dv:
        entry[0] = w[u][v]
    heapq.heapify(Q)

  return cost

def test_solution():
  assert solution(4, [
    [0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]
  ]) == 4
