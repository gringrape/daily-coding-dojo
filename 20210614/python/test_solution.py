def test_is_working():
  assert 1 + 1 == 2

def pick(board, line):
  column = [board[i][line - 1] for i in range(len(board))]

  if all(i == 0 for i in column):
    return None

  depth = [i for i in range(len(column)) if board[i][line - 1] != 0][0]
  doll = board[depth][line - 1]
  
  board[depth][line - 1] = 0

  return doll

def test_pick():
  board = [
    [0,0,0,0,0],
    [0,0,1,0,3],
    [0,2,5,0,1],
    [4,2,4,4,2],
    [3,5,1,3,1],
  ]
  assert pick(board, 1) == 4
  assert pick(board, 1) == 3
  assert pick(board, 2) == 2

# def test_put():
#   stack = []
#   assert put(stack, 1) == False
#   assert put([1], 1) == True
#   assert put([1, 2], 1) == False
#   assert put([1, 2], 2) == True

def solution(board, moves):
  count = 0
  stack = []

  def put(doll):
    if stack and stack[-1] == doll:
      stack.pop()
      return True
    stack.append(doll)
    return False
  
  for move in moves:
    print(stack)
    doll = pick(board, move)
    print(doll)
    if not doll:
      continue

    if put(doll):
      count = count + 1

  return count * 2

def test_solution():
  assert solution([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1,5,3,5,1,2,1,4]) == 4