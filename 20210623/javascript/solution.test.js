test('test works', () => {
  expect(1 + 1).toBe(2);
});

function zip(...arrays) {
  const width = arrays.length;
  const { length } = arrays[0];

  return Array(length).fill()
    .map((_, i) => Array(width).fill().reduce((a, x, j) => [...a, arrays[j][i]], []));
}

test('zip', () => {
  expect(zip([1, 2, 3], [4, 5, 6], [7, 8, 9]))
    .toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);
});

function solution(absolutes, signs) {
  const signValues = signs.map((sign) => (sign ? 1 : -1));

  return zip(signValues, absolutes)
    .map(([sign, abs]) => sign * abs)
    .reduce((a, c) => a + c, 0);
}

test('samples', () => {
  expect(solution(
    [4, 7, 12],
    [true, false, true],
  )).toBe(9);
});
