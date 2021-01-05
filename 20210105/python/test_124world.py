def convert(n):
  if n <= 0:
    return 0
  q, r = divmod(n - 1, 3)
  return (1, 2, 4)[r] + 10 * convert(q)

def test_simple():
  assert convert(1) == 1
  assert convert(2) == 2
  assert convert(3) == 4
  assert convert(4) == 11
  assert convert(10) == 41
  