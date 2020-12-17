function findChar(str, char) {
  return [...str.matchAll(new RegExp(char, 'gi'))].length;
}

test('findChar', () => {
  expect(findChar('p', 'p')).toBe(1);
  expect(findChar('Pp', 'p')).toBe(2);
  expect(findChar('Yyyypp', 'p')).toBe(2);
  expect(findChar('Yyyypp', 'y')).toBe(4);
});

function solution(str) {
  return findChar(str, 'p') === findChar(str, 'y');
}

test('solution', () => {
  expect(solution('pPoooyY')).toBeTruthy();
  expect(solution('Pyy')).toBeFalsy();
  expect(solution('ooo')).toBeTruthy();
});
