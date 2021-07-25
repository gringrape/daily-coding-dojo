function solution(N, stations, W) {
  const construct = (distance) => {
    const range = 2 * W + 1;
    return Math.ceil(distance / range);
  };

  const intalledRanges = stations
    .map((point) => [point - W, point + W]);

  const uninstalledDistances = [[0, 0], ...intalledRanges].map((_, i, arr) => {
    const [, currentEnd] = arr[i];
    const [nextStart] = arr[i + 1] || [N + 1, N + 1];

    return nextStart - currentEnd - 1;
  }).filter((i) => i > 0);

  return uninstalledDistances
    .map(construct)
    .reduce((a, c) => a + c, 0);
}

test('sample', () => {
  expect(solution(11, [4, 11], 1)).toBe(3);
  expect(solution(16, [9], 2)).toBe(3);
  expect(solution(16, [1, 9], 2)).toBe(3);
});
