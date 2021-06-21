def solution(begin, target, words):
  if target not in words:
    return 0

  count_mismatch = lambda a, b: len([_ for x, y in zip(a, b) if x != y]) 

  depth = 0
  q = []
  q.append(begin)

  while q:
    depth += 1
    print(q)
    for _ in range(len(q)):
      current = q.pop(0)
      
      if current == target:
        return depth - 1

      for word in words: 
        if count_mismatch(current, word) == 1:
          q.append(word)

  
  return depth

def test_samples():
  assert solution(
    "hit",
    "cog",
    ["hot", "dot", "dog", "lot", "log", "cog"],
  ) == 4
  assert solution(
    "hit",
    "cog",
    ["hot", "dot", "dog", "lot", "log"],
  ) == 0

def test_is_working():
  assert 1 + 1 == 2