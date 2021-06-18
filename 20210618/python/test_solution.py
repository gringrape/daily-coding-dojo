def test_is_working():
  assert 1 + 1 == 2

def solution(record):
  id_to_name = {}

  verb_translation = {
    'Enter': '들어왔습니다.',
    'Leave': '나갔습니다.'
  }

  def parse(r):
    splitted = r.split(' ')

    return splitted if len(splitted) == 3 else [*splitted, '']

  def translate(r):
    verb, user_id, name = parse(r)

    return id_to_name[user_id] + '님이 ' + verb_translation[verb]

  for r in record:
    verb, user_id, name = parse(r)

    if verb == 'Change' or verb == 'Enter':
      id_to_name[user_id] = name 
  
  return [translate(r) for r in record if r.split(' ')[0] != 'Change']

def test_solution():
  assert solution(
    ["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"]
  ) == ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]