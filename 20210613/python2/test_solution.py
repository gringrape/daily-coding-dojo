def test_is_working():
  assert 1 + 1 == 2

weight_limit = 10
bridge_length = 2

def update(limit, waits, passings, dones, time = 1):
  if time > limit:
    return (waits, passings, dones)

  t, w = passings[0] if len(passings) > 0 else (time, 1)
  if time - t == bridge_length + 1:
    passings.pop(0)
    dones.append(w)

  wait = waits[0] if len(waits) > 0 else weight_limit + 1
  if sum(w for t, w in passings) + wait <= weight_limit:
    passings.append((time - 1, waits.pop(0)))
    
  return update(limit, waits, passings, dones, time + 1)

def test_update():
  assert update(1, [7, 4, 5, 6], [], []) == ([4, 5, 6], [(0, 7)], [])
  assert update(2, [7, 4, 5, 6], [], []) == ([4, 5, 6], [(0, 7)], [])
  assert update(3, [7, 4, 5, 6], [], []) == ([5, 6], [(2, 4)], [7])
  assert update(4, [7, 4, 5, 6], [], []) == ([6], [(2, 4), (3, 5)], [7])
  assert update(5, [7, 4, 5, 6], [], []) == ([6], [(3, 5)], [7, 4])
  assert update(6, [7, 4, 5, 6], [], []) == ([], [(5, 6)], [7, 4, 5])
  assert update(7, [7, 4, 5, 6], [], []) == ([], [(5, 6)], [7, 4, 5])
  assert update(8, [7, 4, 5, 6], [], []) == ([], [], [7, 4, 5, 6])

def solution(bridge_length, weight, truck_weights):
  def finish(passings, dones):
    t, w = passings[0]
    if time - t == bridge_length:
      dones.append(w)
      passings.pop(0)

  def depart(waits, passings):
    total_weight_passings = sum(w for t, w in passings)  
    if total_weight_passings + waits[0] <= weight:
      passings.append((time, waits.pop(0)))

  waits, passings, dones = (truck_weights, [], [])
  time = 0
  
  while waits or passings:
    if passings:
      finish(passings, dones)
    if waits:
      depart(waits, passings)
    time = time + 1
  
  return time

def test_solution():
  assert solution(2, 10, [7,4,5,6]) == 8
  assert solution(100, 100, [10]) == 101
  assert solution(100, 100, [10,10,10,10,10,10,10,10,10,10]) == 110