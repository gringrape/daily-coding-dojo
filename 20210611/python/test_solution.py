from itertools import combinations
from collections import Counter

def solution(orders, course):
  def find_best_combinations(r):
    menu_combinations = [''.join(sorted(comb)) for order in orders for comb in combinations(order, r)]
    common_combinations = Counter(menu_combinations).most_common()

    if len(common_combinations) == 0:
      return []

    max_order_count = max(count for comb, count in common_combinations)
    best_combinations = [
      comb
      for comb, count in common_combinations 
      if count > 1 and count == max_order_count
    ]  
    return best_combinations

  return sorted([
    comb for c in course for comb in find_best_combinations(c)
  ])

def test_samples():
  assert solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2]) == ['AC']
  
  assert solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4]) == ["AC", "ACDE", "BCFG", "CDE"]
  assert solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2,3,5]) == ["ACD", "AD", "ADE", "CD", "XYZ"]

  assert solution(["XYZ", "XWY", "WXA"], [2,3,4]) == ["WX", "XY"]