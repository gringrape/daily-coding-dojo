from itertools import combinations

BIG_NUMBER = 1000000
 
def test_is_working():
  assert 1 + 1 == 2

def solution(orders, course):
  def count_match(comb):
    return sum(
      1 if all(c in order for c in comb) else 0  
      for order in orders
    )

  def pick_course_menus(count_menu):
    combs = {
      ''.join(sorted(comb)) 
      for order in orders 
      for comb in combinations(order, count_menu)
    }
    
    candidates = [(comb, count_match(comb)) for comb in combs]

    max_count = max((count for _, count in candidates), default=BIG_NUMBER)

    return (comb for comb, count in candidates if count == max_count and count > 1)
      
  return sorted(
    picked for c in course for picked in pick_course_menus(c)
  )

def test_samples():
  assert solution(
    ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],
    [2,3,4]
  ) == ["AC", "ACDE", "BCFG", "CDE"]
  assert solution(
    ["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"],
    [2,3,5]
  ) == ["ACD", "AD", "ADE", "CD", "XYZ"]
