test('test works', () => {
  expect(1 + 1).toBe(2);
});

function range(start, end) {
  return [...Array(end - start + 1)].map((_, i) => start + i);
}

function solution(n) {
  const kinds = [1, 1];

  range(2, n).forEach((i) => {
    kinds[i] = (kinds[i - 1] + kinds[i - 2]) % 1_000_000_007;
  });

  return kinds[n];
}

test('sample', () => {
  expect(solution(1)).toBe(1);
  expect(solution(2)).toBe(2);
  expect(solution(3)).toBe(3);
  expect(solution(4)).toBe(5);
});
