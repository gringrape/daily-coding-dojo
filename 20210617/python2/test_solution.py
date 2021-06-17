from itertools import product

def match(id, banned):
  if len(id) != len(banned):
    return False

  return all(
    a == b for a, b in zip(id, banned) if not b == '*'
  )

def solution(user_id, banned_id):
  matches = [
    [id for id in user_id if match(id, banned)]
    for banned in banned_id
  ]

  restrict_ids = {
    tuple(sorted(j)) for j in product(*matches) if len(set(j)) == len(j)
  }  

  return len(restrict_ids)

def test_solution():
  assert solution(
    ["frodo", "fradi", "crodo", "abc123", "frodoc"],
    ["fr*d*", "abc1**"]
  ) == 2

  assert solution(
    ["frodo", "fradi", "crodo", "abc123", "frodoc"],
    ["*rodo", "*rodo", "******"]
  ) == 2