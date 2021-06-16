def test_is_working():
  assert 1 + 1 == 2

def move(start, command):
  x, y = start

  dx, dy = {
    'L': (-1, 0), 
    'R': (+1, 0),
    'U': (0, +1),
    'D': (0, -1),
  }[command]

  new_x = x + dx
  new_y = y + dy

  if new_x < -5 or new_x > 5 or new_y < -5 or new_y > 5:
    return x, y
 
  return (x + dx, y + dy)

def test_move():
  assert move((0, 0), 'L') == (-1, 0)
  assert move((0, 0), 'R') == (+1, 0)
  assert move((0, 0), 'U') == (0, 1)

def test_move_out_of_bound():
  assert move((5, 0), 'R') == (5, 0)

def solution(dirs):
  visited = set()
  start = (0, 0)
  current = start

  distance = 0
  for dir in dirs:
    x, y = current
    nx, ny = move(current, dir)
    key = f'{(x + nx) / 2}-{(y + ny) /2}'
    is_same = x == nx and y == ny

    if not is_same and key not in visited:
      distance += 1

    visited.add(key)
    current = nx, ny
    
  return distance

def test_solution():
  assert solution("ULURRDLLU") == 7
  assert solution("LULLLLLLU") == 7
