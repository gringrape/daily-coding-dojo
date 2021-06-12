from collections import defaultdict
from bisect import bisect_left

def parse_info(infos, D):
  def put_keys(info):
    language, position, grade, food, score = info.split(' ')
    [D[k].append(int(score)) for k in [','.join((x, y, z, w)) 
      for x in {language, '-'}
      for y in {position, '-'}
      for z in {grade, '-'}
      for w in {food, '-'}]]

  [put_keys(i) for i in infos]
    
  return D

def test_parse_info():
  assert parse_info(["java backend junior pizza 150"], defaultdict(list)) == {
    'java,backend,junior,pizza': [150],
    'java,backend,junior,-': [150],
    'java,backend,-,pizza': [150],
    'java,backend,-,-': [150],
    'java,-,junior,pizza': [150],
    'java,-,junior,-': [150],
    'java,-,-,pizza': [150],
    'java,-,-,-': [150],
    '-,backend,junior,pizza': [150],
    '-,backend,junior,-': [150],
    '-,backend,-,pizza': [150],
    '-,backend,-,-': [150],
    '-,-,junior,pizza': [150],
    '-,-,junior,-': [150],
    '-,-,-,pizza': [150],
    '-,-,-,-': [150],
  }

def parse_query(q):
  a, b, c, d, e = q.replace(' and ', ' ').split(' ')
  return (','.join((a, b, c, d)), int(e))

def test_parse_query():
  assert(parse_query("java and backend and junior and pizza 100") == (
    "java,backend,junior,pizza",
    100
  ))

def solution(info, query):
  D = parse_info(info, defaultdict(list))
  for value in D.values():
    value.sort()
  
  def number_people(q):
    key, score = parse_query(q)
    scores = D[key]
    return len(scores) - bisect_left(scores, score) 
    
  return [number_people(q) for q in query]

def test_solution():
  info = ["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"]
  query = ["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]
  assert solution(info, query) == [1,1,1,1,2,4]