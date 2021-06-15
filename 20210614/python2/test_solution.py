from collections import deque

def test_is_working():
  assert 1 + 1 == 2

def solution(maps):
  q = deque()
  m = len(maps)
  n = len(maps[0])
  start = (0, 0)
  end = (m - 1, n - 1)

  q.append(start)

  distance = -1

  while q:
    distance += 1
    # 버그 원인 for _ in q:
    for _ in range(len(q)):
      current = q.popleft()
      r, c = current

      if current == end:
        return distance + 1

      for i, j in [(r + 1, c), (r, c + 1), (r - 1, c), (r, c - 1)]:
        if i < 0 or i > m - 1 or j < 0 or j > n - 1:
          continue
        if maps[i][j] == 0 or maps[i][j] == 2:
          continue
        q.append((i, j))
        maps[i][j] = 2

  return -1

def test_solution():
  maps = [[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]
  assert solution(maps) == 11
