def test_works():
  assert 1 + 1 == 2

from itertools import combinations

def solution(relation):
  def is_unique(key):
    hashes = [
      '-'.join(row[i] for i in key)
      for row in relation
    ]

    return len(set(hashes)) == len(relation)

  def is_minimal(key, unique_keys):
    other_keys = (other_key for other_key in unique_keys if key is not other_key)
    return not any(set(key).issuperset(set(other_key)) for other_key in other_keys)

  indexes = [i for i in range(0, len(relation[0]))]
  keys = [
    combination 
    for i in range(1, len(relation[0]) + 1)
    for combination in combinations(indexes, i)
  ]
  
  unique_keys = [key for key in keys if is_unique(key)]
  minimal_unique_keys = [key for key in unique_keys if is_minimal(key, unique_keys)]

  return len(minimal_unique_keys)

def test_simple():
  assert solution([
    ['100'],
    ['200']
  ]) == 1

def test_unique():
  assert solution([
    ['100', 'ryan'],
    ['200', 'ryan']
  ]) == 1

def test_combination_of_keys():
  assert solution([
    ['100', 'ryan'],
    ['200', 'ryan'],
    ['200', 'angel'],
  ]) == 1

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