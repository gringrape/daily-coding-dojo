def solution(operations):
  Q = []

  for operation in operations:
    a, b = operation.split(" ")
    key, value = a, int(b)

    if key == 'I':
      Q.append(value)

    if not Q:
      continue

    if key == 'D' and value == 1:
      Q.remove(max(Q))

    if key == 'D' and value == -1:
      Q.remove(min(Q))

  if not Q:
    return [0, 0]

  return [max(Q), min(Q)]

def test_sample():
  assert solution(["I 16","D 1"]) == [0, 0]
  assert solution(["I 7","I 5","I -5","D -1"]) == [7, 5]
