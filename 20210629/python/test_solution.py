def test_works():
  assert 1 + 1 == 2

import sys
import heapq

def solution(stones, k):
  stones = [-1 * stone for stone in stones]
  Q = [stone for i, stone in enumerate(stones) if i < k]
  heapq.heapify(Q)
  M = Q[0]
  toDrop = []
  for i in range(len(stones) - k):
    if Q[0] == stones[i]:
      heapq.heappop(Q)
    else:
      heapq.heappush(toDrop, stones[i])
    while toDrop and Q[0] == toDrop[0]:
      heapq.heappop(Q)
      heapq.heappop(toDrop)
    heapq.heappush(Q, stones[i + k])
    
    if M < Q[0]:
      M = Q[0]

  return M * -1

def test_sample():
  assert solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3) == 3
