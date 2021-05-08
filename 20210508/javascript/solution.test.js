function capitalize(word) {
  if (!word) {
    return '';
  }

  const head = word[0];
  const tail = word.slice(1);

  return head.toUpperCase()
    .concat(tail.toLowerCase());
}

function solution(string) {
  const words = string.split(' ');

  return words
    .map(capitalize)
    .join(' ');
}

test('one word', () => {
  expect(solution('for')).toBe('For');
  expect(solution('case')).toBe('Case');

  expect(solution('3people')).toBe('3people');
});

test('two words', () => {
  expect(solution('she is')).toBe('She Is');
});

test('three words', () => {
  expect(solution('she is beautiful')).toBe('She Is Beautiful');
});

test('lowercase other than initial character', () => {
  expect(solution('three people unFollowed me'))
    .toBe('Three People Unfollowed Me');
});

test('only one character exists in string', () => {
  expect(solution('a')).toBe('A');

  expect(solution('a b')).toBe('A B');
});

test('starts with blank', () => {
  expect(solution(' ')).toBe(' ');
  expect(solution(' she is beautiful'))
    .toBe(' She Is Beautiful');
});
