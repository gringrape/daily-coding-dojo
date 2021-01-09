const chunk = (s, n) => (s.length <= n ? [s] : [s.slice(0, n), ...chunk(s.slice(n), n)]);

const compress = (s, n) => {
  const make = ([a, l, c]) => `${a}${c > 1 ? c : ''}${l}`;
  return make(
    chunk(s, n).reduce(
      ([a, l, c], e) => (e === l ? [a, l, c + 1] : [make([a, l, c]), e, 1]),
      ['', '', 0],
    ),
  );
};

const solution = (s) => {
  const range = [...Array(s.length)].map((_, i) => i + 1);
  return Math.min(...range.map((i) => compress(s, i).length));
};

test('sample', () => {
  expect(solution('a')).toBe(1);
  expect(solution('aabbaccc')).toBe(7);
  expect(solution('ababcdcdababcdcd')).toBe(9);
  expect(solution('abcabcdede')).toBe(8);
  expect(solution('abcabcabcabcdededededede')).toBe(14);
  expect(solution('xababcdcdababcdcd')).toBe(17);
});
