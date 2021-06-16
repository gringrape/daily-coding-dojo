def test_is_working():
  assert 1 + 1 == 2

def pick(board, line):
  c = line - 1
  transposed_board = [list(x) for x in zip(*board)]
  column = transposed_board[c]

  if all(x == 0 for x in column):
    return

  r = next(r for r, x in enumerate(column) if x != 0)
  doll = board[r][c] 
  board[r][c] = 0

  return doll

def test_pick():
  board = [
    [0,0,0,0,0],
    [0,0,1,0,3],
    [0,2,5,0,1],
    [4,2,4,4,2],
    [3,5,1,3,1]
  ]

  assert pick(board, 1) == 4 
  assert pick(board, 1) == 3 

class Basket:
  def __init__(self):
    self.stack = []
    self.bomb_count = 0

  def put(self, doll):
    if not doll:
      return

    if self.stack and self.stack[-1] == doll:
      self.stack.pop()
      self.bomb_count += 2
      return
    
    self.stack.append(doll)

def test_Basket_put():
  basket = Basket()
  
  basket.put(1)
  
  assert basket.stack == [1]

def test_Basket_put_bomb():
  basket = Basket()
  
  basket.put(1)
  basket.put(1)

  assert basket.stack == []
  assert basket.bomb_count == 2

def solution(board, moves):
  basket = Basket()

  for move in moves:
    doll = pick(board, move)
    basket.put(doll)

  return basket.bomb_count

def test_solution():
  board = [
    [0,0,0,0,0],
    [0,0,1,0,3],
    [0,2,5,0,1],
    [4,2,4,4,2],
    [3,5,1,3,1]
  ]
  moves = [1,5,3,5,1,2,1,4]

  assert solution(board, moves) == 4 