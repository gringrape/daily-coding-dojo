def test_works():
  assert 1 + 1 == 2

from itertools import combinations

def solution(relation):
  def is_unique(key):
    columns = {'-'.join([row[c] for c in key]) for row in relation}

    return len(relation) == len(columns)

  indexes = [i for i in range(len(relation[0]))]
  keys = [comb for i in range(len(relation)) for comb in combinations(indexes, i) ]
  
  unique_keys = [
    key 
    for key in keys
    if is_unique(key)
  ]

  result_keys = [
    key
    for key in unique_keys
    if not any(set(other_key).issubset(set(key)) for other_key in unique_keys if key is not other_key)
  ]

  return len(result_keys)
  
def test_samples():
  assert solution(
    [
      ["100","ryan","music","2"],
      ["200","apeach","math","2"],
      ["300","tube","computer","3"],
      ["400","con","computer","4"],
      ["500","muzi","music","3"],
      ["600","apeach","music","2"]
    ]
  ) == 2