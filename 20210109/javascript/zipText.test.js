function zipLetters(text, size) {
  if (text.length === 0) {
    return '';
  }

  const matchedLength = text.match(new RegExp(`^(${text.slice(0, size)})+`))[0].length;
  const zipNumber = Math.floor(matchedLength / size);

  return `${zipNumber === 1 || zipNumber === 0 ? '' : zipNumber}`
    + `${text.slice(0, size)}`
    + `${zipLetters(text.slice(matchedLength), size)}`;
}

describe('zipLetters', () => {
  test('size 1', () => {
    expect(zipLetters('a', 1)).toBe('a');
    expect(zipLetters('aa', 1)).toBe('2a');
    expect(zipLetters('aaa', 1)).toBe('3a');
    expect(zipLetters('aabbaccc', 1)).toBe('2a2ba3c');
  });

  test('size 2', () => {
    expect(zipLetters('aaaa', 2)).toBe('2aa');
    expect(zipLetters('abab', 2)).toBe('2ab');
    expect(zipLetters('abcabcabcabcdededededede', 2)).toBe('abcabcabcabc6de');
  });

  test('size 3', () => {
    expect(zipLetters('abcabcdede', 3)).toBe('2abcdede');
  });

  test('size 4', () => {
    expect(zipLetters('abcabcabcabcdededededede', 4)).toBe('abcabcabcabc3dede');
  });
});

const range = (from, to) => Array(to - from + 1).fill().map((_, i) => i + from);

function solution(text) {
  if (text.length === 1) {
    return 1;
  }

  return Math.min(...range(1, Math.floor(text.length / 2))
    .map((size) => zipLetters(text, size).length));
}

test('sample', () => {
  expect(solution('a')).toBe(1);
  expect(solution('aabbaccc')).toBe(7);
  expect(solution('ababcdcdababcdcd')).toBe(9);
  expect(solution('abcabcdede')).toBe(8);
  expect(solution('abcabcabcabcdededededede')).toBe(14);
  expect(solution('xababcdcdababcdcd')).toBe(17);
});
