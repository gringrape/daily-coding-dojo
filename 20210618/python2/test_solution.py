from collections import OrderedDict

def test_is_working():
  assert 1 + 1 == 2

def solution(gems):
  gem_kinds = len(set(gems))
  gem_map = dict()
  
  min_range = None
  min_length = len(gems)

  current_min = len(gems)

  for i, gem in enumerate(gems):
    if gem_map.get(gem, None):
      gem_map.pop(gem)
    gem_map[gem] = i + 1

    if len(gem_map.keys()) < gem_kinds:
      continue

    values = gem_map.values()

    current_max = i + 1
    current_min = list(values)[0]

    length = current_max - current_min

    if length < min_length:
      min_range = [current_min, current_max]
      min_length = length
 
  return min_range

def test_samples():
  assert solution(
    ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]
  ) == [3, 7]
  assert solution(
    ["AA", "AB", "AC", "AA", "AC"]
  ) == [1, 3]
