import heapq

def test_is_working():
  assert 1 + 1 == 2

def solution(n, times):
  heap = []
  result_time = 0

  for time in times:
    heapq.heappush(heap, (time, time))

  for _ in range(n):
    time, duration = heapq.heappop(heap)
    result_time = time
    heapq.heappush(heap, (time + duration, duration))

  return result_time

def test_samples():
  assert solution(
    6, [7, 10]
  ) == 28
