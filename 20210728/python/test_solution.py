import heapq

def solution(scoville, K):
  heapq.heapify(scoville)

  count = 0
  while scoville[0] < K:
    if len(scoville) < 2:
      return -1
    smallest = heapq.heappop(scoville)
    second_smallest = heapq.heappop(scoville)

    heapq.heappush(
      scoville,
      smallest + 2 * second_smallest, 
    )
    count += 1

  return count

def test_solution():
  assert solution([1, 2, 3, 9, 10, 12], 7) == 2
