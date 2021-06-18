test('test is working', () => {
  expect(1 + 1).toBe(2);
});

function product(array) {
  const result = [];

  function go(index = 0, picked = []) {
    if (index > array.length - 1) {
      result.push(picked);
      return;
    }

    array[index].forEach((c) => {
      go(index + 1, [...picked, c]);
    });
  }

  go();

  const filtered = result
    .map((r) => [...new Set(r)])
    .map((r) => r.sort())
    .filter((r) => r.length === array.length)
    .map((r) => r.toString());

  return [...new Set(filtered)];
}

function match(userId, bannedId) {
  const isMatched = (bannedUser, user) => {
    if (bannedUser.length !== user.length) {
      return false;
    }

    return [...bannedUser]
      .every((c, i) => c === '*' || c === user[i]);
  };

  return bannedId
    .map((bannedUser) => userId.filter((user) => isMatched(bannedUser, user)));
}

function solution(userId, bannedId) {
  const matches = match(userId, bannedId);

  return product(matches)
    .length;
}

test('samples', () => {
  expect(solution(
    ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
    ['fr*d*', 'abc1**'],
  )).toBe(2);

  expect(solution(
    ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
    ['*rodo', '*rodo', '******'],
  )).toBe(2);

  expect(solution(
    ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
    ['fr*d*', '*rodo', '******', '******'],
  )).toBe(3);

  expect(solution(
    ['12345', '12453', 'aaaaa'],
    ['*****', '*****'],
  )).toBe(3);
});
