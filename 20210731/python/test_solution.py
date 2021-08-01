import heapq

def solution(N, roads, K):
  # 거리를 찾기 쉽도록 자료구조로 정의
  times = [[None] * N for _ in range(N)]
  for i in range(N):
    times[i][i] = 0
  for first, second, time in roads:
    prev = times[first - 1][second - 1]
    if not prev or time < prev:
      times[first - 1][second - 1] = time
      times[second - 1][first - 1] = time

  print(times)
  
  # 1 번 마을로 부터의 최소시간 정의
  large_number = 10 ** 12
  D = [0] + [large_number] * (N - 1)

  # Q 를 정의하고 방문할 노드를 추가
  Q = [(D[i], i + 1) for i in range(N)]
  heapq.heapify(Q)

  while Q:
    print(D)
    Dj, town = heapq.heappop(Q)
    # edge relaxation
    for i in range(N):
      time = times[town - 1][i]
      if time and D[i] > Dj + time:
        D[i] = Dj + time
    # Q 를 재 정렬
    for i in range(len(Q)):
      Di, town = Q[i]
      Q[i] = (D[town - 1], town)
    heapq.heapify(Q)
  
  print(D)

  return len([d for d in D if d <= K])

def test_solution():
  # assert solution(
  #   5,
  #   [[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]],
  #   3
  # ) == 3
  assert solution(
6, [[1, 2, 1], [1, 3, 2], [2, 3, 2], [3, 4, 3], [3, 5, 2], [3, 5, 3], [5, 6, 1]], 4  ) == 4