function print(sentence, idToNames) {
  const translations = {
    Enter: '들어왔습니다.',
    Leave: '나갔습니다.',
  };

  const [verb, id] = sentence.split(' ');

  if (verb === 'Change') {
    return '';
  }

  return `${idToNames[id]}님이 ${translations[verb]}`;
}

test('user enters chat', () => {
  expect(print(
    'Enter uid1234 Muzi',
    { uid1234: 'Muzi' },
  )).toBe('Muzi님이 들어왔습니다.');
});

test('user leaves chat', () => {
  expect(print(
    'Leave uid1234 Muzi',
    { uid1234: 'Muzi' },
  )).toBe('Muzi님이 나갔습니다.');
});

test('user changes name - ignore sentence', () => {
  expect(print(
    'Change uid1234 Muzi',
  )).toBe('');
});

function solution(record) {
  const userNames = {};

  record.forEach((sentence) => {
    const [verb, id, name] = sentence.split(' ');

    if (verb === 'Leave') {
      return;
    }

    userNames[id] = name;
  });

  return record
    .map((sentence) => print(sentence, userNames))
    .filter((i) => i);
}

test('test is working', () => {
  expect(1 + 1).toBe(2);
});

test('user changes nick', () => {
  expect(
    solution(['Enter uid4567 Prodo', 'Change uid4567 Ryan']),
  ).toEqual([
    'Ryan님이 들어왔습니다.',
  ]);
});
