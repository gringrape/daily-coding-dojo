def test_is_working():
  assert 1 + 1 == 2

max_lengths = []

def solution(arr):
  num_rows = len(arr)
  num_cols = len(arr[0])
  max_lengths = [[None] * num_cols for i in range(num_rows)] 

  def m(i, j):
    if i < 0 or i >= num_rows or j < 0 or j >= num_cols:
      return 0
    return max_lengths[i][j] 
      
  for j in reversed(range(num_cols)):
    for i in reversed(range(num_rows)):
      min_neighbors = min(
        m(i + 1, j),
        m(i, j + 1),
        m(i + 1, j + 1)
      )      
      max_lengths[i][j] = 1 + min_neighbors if arr[i][j] == 1 else 0

  return max(max_length for row in max_lengths for max_length in row) ** 2

def test_solution():
  assert solution([
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 1, 0]
  ]) == 9