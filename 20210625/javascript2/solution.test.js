/* eslint-disable no-bitwise */
test('test works', () => {
  expect(1 + 1).toBe(2);
});

function range(n) {
  return Array(n).fill().map((_, i) => i);
}

function solution(n, arr1, arr2) {
  return range(n)
    .map((i) => (arr1[i] | arr2[i]).toString(2)
      .padStart(n, '0')
      .replace(/0/g, ' ')
      .replace(/1/g, '#'));
}

test('samples', () => {
  expect(solution(
    5,
    [9, 20, 28, 18, 11],
    [30, 1, 21, 17, 28],
  )).toEqual(['#####', '# # #', '### #', '#  ##', '#####']);
});
