test('test is working', () => {
  expect(1 + 1).toBe(2);
});
function splitWith(s, unit) {
  const max = Math.ceil(s.length / unit);

  return [...Array(max)]
    .map((_, i) => s.slice(i * unit, (i + 1) * unit));
}

function compress(s, unit) {
  const reducer = splitWith(s, unit)
    .reduce((acc, current) => {
      const [count, previous] = acc.slice(-2);

      if (current !== previous) {
        return [...acc, 1, current];
      }

      return [...acc.slice(0, -2), count + 1, current];
    }, []);

  return reducer.filter((a) => a !== 1).join('');
}

function solution(s) {
  if (s.length === 1) {
    return 1;
  }

  const units = [...Array(Math.floor(s.length / 2))]
    .map((_, i) => i + 1)
    .map((unit) => compress(s, unit).length);

  return Math.min(...units);
}

test('split with unit', () => {
  expect(splitWith('aabb', 2)).toEqual(['aa', 'bb']);
  expect(splitWith('aaabbbccc', 3)).toEqual(['aaa', 'bbb', 'ccc']);
});

test('solution', () => {
  expect(solution('a')).toBe(1);
  expect(solution('aabbaccc')).toBe(7);
  expect(solution('aabaa')).toBe(5);
  expect(solution('ababcdcdababcdcd')).toBe(9);
  expect(solution('abcabcdede')).toBe(8);
  expect(solution('abcabcabcabcdededededede')).toBe(14);
  expect(solution('xababcdcdababcdcd')).toBe(17);
});

test('compress', () => {
  expect(compress('a', 1)).toBe('a');
  expect(compress('aaaa', 1)).toBe('4a');
  expect(compress('aab', 1)).toBe('2ab');
  expect(compress('aabaa', 1)).toBe('2ab2a');
});

test('when unit is over 2', () => {
  expect(compress('aaaa', 2)).toBe('2aa');
});
